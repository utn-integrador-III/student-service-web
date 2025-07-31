import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LabManaging } from './../../../Services/lab-Managing/labManaging.service';
import { PermissionService } from '../../../Services/permission/permission.service';
import { IssueService } from '../../../Services/issue/issue.service';

@Component({
  selector: 'app-report-issue',
  templateUrl: './report-issue.component.html',
  styleUrls: ['./report-issue.component.css'],
})
export class ReportIssueComponent implements OnInit {
  displayedColumns: string[] = ['number', 'description', 'date'];
  imageUrlsLeft: any[] = [];
  imageUrlsRight: any[] = [];
  selectedImages: Set<any> = new Set();
  selectedComputerNumber: string = '';
  labs: any[] = [];
  selectedLab: any = null;
  canCreate = false;
  description: string = ''; // Para el textarea
  issues: any[] = []; // Para la tabla de issues

  constructor(
    private labManaging: LabManaging,
    private cdr: ChangeDetectorRef,
    private permissionService: PermissionService,
    private issueService: IssueService
  ) {
    this.canCreate = this.permissionService.canManageIssues();
  }

  ngOnInit(): void {
    this.loadLabs();
    this.loadIssues();
  }

  loadLabs() {
    this.labManaging.getObjects().subscribe((response: any) => {
      console.log('Datos recibidos:', response);
      if (response && Array.isArray(response.data)) {
        const uniqueLabsMap = new Map<string, any>();
        response.data.forEach((lab: any) => {
          if (!uniqueLabsMap.has(lab.lab_name)) {
            uniqueLabsMap.set(lab.lab_name, lab);
          }
        });
        this.labs = Array.from(uniqueLabsMap.values()).sort((a: any, b: any) =>
          a.lab_name.localeCompare(b.lab_name)
        );
        console.log(
          'Labs únicos y ordenados:',
          this.labs.map((l) => l.lab_name)
        );
        if (this.labs.length > 0) {
          this.selectedLab = this.labs[0];
          this.updateImageUrls();
        }
      } else {
        console.error('La propiedad `data` no es un array o no está presente');
      }
      this.cdr.detectChanges();
    });
  }

  loadIssues() {
    this.issueService.getIssues().subscribe({
      next: (response) => {
        if (response.status === 200 && response.data) {
          this.issues = response.data.map((issue: any) => ({
            number: issue.issue.map((i: any) => i.computer).join(', '),
            description: issue.issue.map((i: any) => i.description).join('; '),
            date: issue.date_issue,
          }));
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        console.error('Error al cargar issues:', err);
      },
    });
  }

  updateImageUrls() {
    console.log(
      'Actualizando URLs de imágenes para laboratorio:',
      this.selectedLab
    );
    this.imageUrlsLeft = [];
    this.imageUrlsRight = [];

    if (this.selectedLab && this.selectedLab.computers) {
      const computers = this.selectedLab.computers;
      const numberOfComputers = computers.length;

      for (let i = 0; i < numberOfComputers; i++) {
        let computerId = computers[i];
        let image = {
          imageUrl: `/assets/images/computer.png`,
          number: computerId,
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
    this.updateCanCreate();
  }

  onImageClick(image: any): void {
    if (this.selectedImages.has(image)) {
      image.imageUrl = '/assets/images/computer.png';
      this.selectedImages.delete(image);
    } else {
      image.imageUrl = '/assets/images/redComputer.png';
      this.selectedImages.add(image);
    }
    this.updateSelectedComputerNumber();
    this.updateCanCreate();
  }

  updateSelectedComputerNumber() {
    const selectedNumbers = Array.from(this.selectedImages)
      .map((image: any) => image.number)
      .join(', ');
    this.selectedComputerNumber = selectedNumbers;
  }

  onLabSelect(lab: any) {
    console.log('Laboratorio seleccionado:', lab);
    this.selectedLab = lab;
    this.selectedImages.clear();
    this.updateSelectedComputerNumber();
    this.updateImageUrls();
    this.updateCanCreate();
  }

  updateCanCreate() {
    this.canCreate =
      this.permissionService.canManageIssues() &&
      !!this.selectedLab &&
      this.selectedImages.size > 0 &&
      !!this.description.trim();
    this.cdr.detectChanges();
  }

  createIssue() {
    if (!this.canCreate) return;

    const issueData = {
      lab: this.selectedLab.lab_name,
      person: {
        email: 'user@example.com', // Reemplazar con el email del usuario autenticado
        student_name: 'Student Name', // Reemplazar con el nombre del usuario autenticado
      },
      issue: Array.from(this.selectedImages).map((image: any) => ({
        computer: image.number,
        description: this.description,
        is_repaired: false,
      })),
      observations: this.description,
    };

    this.issueService.addIssue(issueData).subscribe({
      next: (response) => {
        if (response.status === 201) {
          console.log('Issue creado:', response.data);
          this.loadIssues(); // Refrescar la tabla
          this.selectedImages.clear();
          this.description = '';
          this.updateSelectedComputerNumber();
          this.updateImageUrls();
          this.updateCanCreate();
        }
      },
      error: (err) => {
        console.error('Error al crear issue:', err);
        // Aquí podrías mostrar un mensaje de error al usuario
      },
    });
  }
}
