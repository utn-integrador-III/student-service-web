import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProfessorManaging } from '../../Services/professors/professor.service';
import { LabManaging } from '../../Services/lab-Managing/labManaging.service';
import { PermissionService } from '../../Services/permission/permission.service';
import { AuthService } from '../../auth/auth.service';
import { ProfessorEmail } from '../../Services/professorByEmail/professorByEmail.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { IAuth } from '../../login/models/login.model';
import { Subscription, of } from 'rxjs';
import { Booking } from '../../Services/booking/booking.service';
import { ToastrService } from 'ngx-toastr';
import { format, addHours } from 'date-fns';
import { DataTransferService } from '../TranferServices/transfetServices.component';

interface Professor {
  professor_name: string;
  professor_email: string;
  career: {
    career_id: string;
    career_name: string;
  };
  subject: { subject_id: string; subject_name: string }[];
}

@Component({
  selector: 'app-teacher-log',
  templateUrl: './teacher-log.component.html',
  styleUrl: './teacher-log.component.css',
})
export class TeacherLogComponent implements OnInit {
  displayedColumns: string[] = ['name', 'computer_number', 'date'];
  dataSource = new MatTableDataSource();
  professors: Professor[] = [];
  professorNames: string[] = [];
  selectedProfessor: Professor | null = null;
  courses: Array<{ course_id: string; course_name: string }> = [];
  labs: any[] = [];
  selectedLab: any = null;
  selectedProfessorName: string = '';
  canWrite = false;
  userAuthenticated: IAuth | null = null;
  menuOpen: boolean = false;
  professorName: string = '';
  private subscriptions: Subscription = new Subscription();
  selectedCourse: any;
  endTime: string = '';
  selectedCareer: any;
  careers: Array<{ career_id: string; career_name: string }> = [];

  constructor(
    private professorManaging: ProfessorManaging,
    private cdr: ChangeDetectorRef,
    private labManaging: LabManaging,
    private store: Store<fromApp.AppState>,
    private router: Router,
    private authService: AuthService,
    private professorEmail: ProfessorEmail,
    private Booking: Booking,
    private toastr: ToastrService,
    private dataTransferService: DataTransferService,
    private permissionService: PermissionService
  ) {
    this.canWrite = this.permissionService.hasPermission(
      'write',
      '/teacherlog'
    );
  }

  ngOnInit() {
    this.subscriptions.add(
      this.store.select('auth').subscribe((authState) => {
        this.userAuthenticated = authState.auth;
        this.loadLabs();
        this.getSelectedRowDatas();
        this.infoInformacionByEmail(this.userAuthenticated.email);
        const selectedRow = this.dataTransferService.getSelectedRowData();
        console.log(selectedRow);
      })
    );
  }

  getSelectedRowDatas(): void {
    const selectedRow = this.dataTransferService.getSelectedRowData();
    if (selectedRow && selectedRow.students) {
      this.dataSource.data = selectedRow.students.map((student) => ({
        name: student.student_name,
        computer_number: student.computer,
        date: new Date(student.usage_time).toLocaleString(),
      }));
    }
  }

  infoInformacionByEmail(email: string): void {
    const domain = '@utn.ac.cr';
    if (this.userAuthenticated?.email.endsWith(domain)) {
      this.professorEmail.getProfessorByEmail(email).subscribe((response) => {
        if (response && response.data) {
          this.professorName = response.data.professor_name;

          this.courses = response.data.Courses;
          this.selectedCourse =
            this.courses.length > 0 ? this.courses[0].course_id : null;

          if (response.data.Career && response.data.CareerId) {
            this.careers = [
              {
                career_id: response.data.CareerId,
                career_name: response.data.Career,
              },
            ];

            this.selectedCareer =
              this.careers.length > 0 ? this.careers[0] : null;
          }

          this.userAuthenticated = {
            name: response.data.professor_name,
            email: response.data.professor_email,
          };
        }
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadLabs() {
    this.labManaging.getObjects().subscribe((response: any) => {
      console.log('Datos recibidos:', response);
      if (response && Array.isArray(response.data)) {
        this.labs = response.data;

        if (this.labs.length > 0) {
          this.selectedLab = this.labs[0];
        }
      } else {
      }
      this.cdr.detectChanges();
    });
  }
  onLabSelect(lab: any) {
    console.log('Laboratorio seleccionado:', lab);
    this.selectedLab = lab;
  }

  saveBooking() {
    if (!this.endTime) {
      this.toastr.warning('Por favor, selecciona una hora de fin.');
      return;
    }

    if (!this.selectedCareer) {
      this.toastr.warning('Por favor, selecciona una carrera.');
      return;
    }

    if (!this.selectedCourse) {
      this.toastr.warning('Por favor, selecciona un curso.');
      return;
    }

    if (!this.selectedLab) {
      this.toastr.warning('Por favor, selecciona un laboratorio.');
      return;
    }

    // Obtención de datos
    const startTime = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss");
    const formattedEndTime = format(
      new Date(this.endTime),
      "yyyy-MM-dd'T'HH:mm:ss"
    );
    console.log('lab', this.selectedLab);
    const bookingData = {
      professor: this.professorName,
      professor_email: this.userAuthenticated?.email,
      career: this.selectedCareer?.career_name || '',
      subject: this.selectedCourse?.course_name || '',
      lab: this.selectedLab?.lab_name || '',

      start_time: startTime,
      end_time: formattedEndTime,
    };

    // Enviar datos al servicio
    this.Booking.addBooking(bookingData).subscribe(
      (response) => {
        console.log('Reserva realizada con éxito', response);
        this.toastr.success('Reserva realizada con éxito');
      },
      (error) => {
        console.error('Error al realizar la reserva', error);
        this.toastr.error('Error al realizar la reserva');
      }
    );
  }

  addFourHours() {
    const currentTime = new Date();
    const newTime = addHours(currentTime, 4);
    this.endTime = format(newTime, "yyyy-MM-dd'T'HH:mm:ss");
    this.toastr.info('Hora de fin actualizada a las ' + this.endTime);
  }
}
