import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { IAuth } from '../../login/models/login.model';
import { Subscription } from 'rxjs';
import { DataTransferService } from '../TranferServices/transfetServices.component';
import { LabManaging } from '../../Services/lab-Managing/labManaging.service';
import { BookingComputer } from '../../Services/bookingComputer/bookingComputer.service';
import { ToastrService } from 'ngx-toastr';
import { response } from 'express';

@Component({
  selector: 'app-student-log',
  templateUrl: './student-log.component.html',
  styleUrls: ['./student-log.component.css'],
})
export class StudentLogComponent implements OnInit {
  private subscriptions: Subscription = new Subscription();
  userAuthenticated: IAuth | null = null;
  StudentName: string = '';
  subject: string = '';
  lab: string = '';
  professor: string = '';
  selectedRow = this.dataTransferService.getSelectedRowData();
  labname: string = '';
  displayedColumns: string[] = ['name', 'computer_number', 'date', 'accions'];
  allComputerNumbers: string[] = [];
  buttonClicked: boolean = false;

  dataSource = new MatTableDataSource<any>([]);

  imageUrlsLeft: any[] = [];
  imageUrlsRight: any[] = [];
  selectedImage: any = null;
  occupiedComputers: Set<string> = new Set();

  constructor(
    private store: Store<fromApp.AppState>,
    private dataTransferService: DataTransferService,
    private labManaging: LabManaging,
    private cdr: ChangeDetectorRef,
    private BookingComputer: BookingComputer,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.store.select('auth').subscribe((authState) => {
        this.userAuthenticated = authState.auth;
        this.StudentName = this.userAuthenticated.name;
        const selectedRow = this.dataTransferService.getSelectedRowData();
        this.subject = selectedRow.subject;
        this.lab = selectedRow.lab;
        this.professor = selectedRow.professor;
        this.labname = selectedRow.lab_name;
        this.checkAndUpdateTableForAuthenticatedStudent();

        this.loadLabs();
        this.cdr.detectChanges();
      })
    );
  }

  updateTable(bookingData: any): void {
    const newEntry = {
      name: bookingData.student_name,
      computer_number: bookingData.computer,
      date: new Date().toISOString().split('T')[0],
    };

    this.dataSource.data = [...this.dataSource.data, newEntry];
  }

  selectedComputerNumber: string;

  isComputerOccupied(computerNumber: string): boolean {
    return this.occupiedComputers.has(computerNumber);
  }

  onImageClick(image: any): void {
    if (image.isOccupied) {
      this.toastr.info(
        'Esta computadora ya está ocupada y no se puede seleccionar.',
        'Información'
      );
      return;
    }

    this.selectedComputerNumber = image.number;

    if (this.selectedImage) {
      this.selectedImage.imageUrl = '/assets/images/computer.png';
    }
    image.imageUrl = '/assets/images/redComputer.png';
    this.selectedImage = image;
  }

  loadLabs() {
    this.labManaging.getObjects().subscribe((response: any) => {
      console.log('Datos recibidos:', response);
      if (response && Array.isArray(response.data)) {
        const labs = response.data;

        const selectedLabName = this.lab;
        const labObject = labs.find(
          (lab: any) => lab.lab_name === selectedLabName
        );

        if (
          labObject &&
          labObject.computers &&
          Array.isArray(labObject.computers)
        ) {
          this.updateImageUrls(labObject);

          this.allComputerNumbers = [
            ...this.imageUrlsLeft,
            ...this.imageUrlsRight,
          ].map((computer) => computer.number);
        }
      }
      this.cdr.detectChanges();
    });
  }

  updateImageUrls(labObject: any) {
    const selectedRow = this.dataTransferService.getSelectedRowData();

    const computers1 = selectedRow.students.map((student) => student.computer);

    if (labObject && labObject.computers) {
      const computers = labObject.computers;
      const numberOfComputers = computers.length;
      console.log('Computadoras del laboratorio:', computers);

      this.imageUrlsLeft = [];
      this.imageUrlsRight = [];

      for (let i = 0; i < numberOfComputers; i++) {
        let computerId = computers[i];
        let isOccupied = computers1.includes(computerId);
        let imageUrl = isOccupied
          ? '/assets/images/redComputer.png'
          : '/assets/images/computer.png';

        let image = {
          imageUrl: imageUrl,
          number: computerId,
          isOccupied: isOccupied,
          disabled: isOccupied,
          textClass: isOccupied ? 'red-text' : '',
        };

        if (i < Math.ceil(numberOfComputers / 2)) {
          this.imageUrlsLeft.push(image);
        } else {
          this.imageUrlsRight.push(image);
        }
      }
    } else {
      console.log(
        'No se encontraron computadoras en el laboratorio seleccionado.'
      );
    }
  }
  checkAndUpdateTableForAuthenticatedStudent(): void {
    const selectedRow = this.dataTransferService.getSelectedRowData();
    const studentEmail = this.userAuthenticated?.email;

    if (studentEmail) {
      const student = selectedRow.students.find(
        (student) => student.student_email === studentEmail
      );

      if (student) {
        const bookingData = {
          student_name: student.student_name,
          computer: student.computer,
          date: new Date().toISOString().split('T')[0],
        };

        this.updateTable(bookingData);
      }
    }
  }

  saveBooking(): void {
    const selectedRow = this.dataTransferService.getSelectedRowData();

    const studentEmails = selectedRow.students.map(
      (student) => student.student_email
    );
    console.log('Student Emails:', studentEmails);

    if (!this.selectedRow || !this.selectedComputerNumber) {
      this.toastr.error(
        'Por favor, selecciona un estudiante y una computadora.',
        'Error'
      );
      return;
    }

    const studentEmail = this.userAuthenticated?.email;

    if (studentEmails.includes(studentEmail)) {
      this.toastr.error(
        'Ya has reservado una computadora en este laboratorio. No puedes reservar otra.',
        'Error'
      );
      return;
    }

    const bookingData = {
      lab_book_id: this.selectedRow.id,
      student_email: studentEmail,
      student_name: this.userAuthenticated?.name,
      computer: this.selectedComputerNumber,
    };

    console.log('Datos de reserva:', bookingData);
    this.buttonClicked = true;

    this.BookingComputer.addBooking(bookingData).subscribe(
      (response) => {
        this.toastr.success('Reserva guardada exitosamente.', 'Éxito');
        console.log('Reserva guardada exitosamente:', response);
        this.updateTable(bookingData);
      },
      (error) => {
        this.toastr.error('Ocurrió un error al guardar la reserva.', 'Error');
        console.error('Error al guardar la reserva:', error);
        this.buttonClicked = false;
      }
    );
  }
}
