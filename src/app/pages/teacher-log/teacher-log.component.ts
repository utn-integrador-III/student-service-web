import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProfessorManaging } from '../../Services/professors/professor.service';
import { LabManaging } from '../../Services/lab-Managing/labManaging.service';

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
  courses: { subject_id: string; subject_name: string }[] = [];
  labs: any[] = [];
  selectedLab: any = null;
  selectedProfessorName: string = '';

  constructor(
    private professorManaging: ProfessorManaging,
    private cdr: ChangeDetectorRef,
    private labManaging: LabManaging
  ) {}

  ngOnInit() {
    this.loadProfessors();
    this.loadLabs();
  }

  loadProfessors() {
    this.professorManaging.getProffesors().subscribe((response: any) => {
      console.log('Datos recibidos:', response);
      if (response && Array.isArray(response.data)) {
        this.professors = response.data;
        this.professorNames = response.data.map(
          (prof: Professor) => prof.professor_name
        );
      } else {
      }
      this.cdr.detectChanges();
    });
  }

  onProfessorSelect() {
    this.selectedProfessor =
      this.professors.find(
        (prof) => prof.professor_name === this.selectedProfessorName
      ) || null;
    this.courses = this.selectedProfessor ? this.selectedProfessor.subject : [];
    this.cdr.detectChanges();
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
        console.error('La propiedad `data` no es un array o no está presente');
      }
      this.cdr.detectChanges();
    });
  }
  onLabSelect(lab: any) {
    console.log('Laboratorio seleccionado:', lab);
    this.selectedLab = lab;
  }
}
