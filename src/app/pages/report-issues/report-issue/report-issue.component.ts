import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { LabManaging } from './../../../Services/lab-Managing/labManaging.service';
import { PermissionService } from '../../../Services/permission/permission.service';
import { IssueService } from '../../../Services/issue/issue.service';
import { AuthService } from '../../../auth/auth.service';
import { ToastService } from '../../../Services/toaster.service';
import { VisualizationIssueDialogComponent } from './dialog/visualization-issue-dialog.component';
//Texto para hacer nuevo commit
@Component({
  selector: 'app-report-issue',
  templateUrl: './report-issue.component.html',
  styleUrls: ['./report-issue.component.css'],
})
export class ReportIssueComponent implements OnInit {
  displayedColumns: string[] = ['lab', 'number', 'description', 'date'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  imageUrlsLeft: any[] = [];
  imageUrlsRight: any[] = [];
  selectedImages: Set<any> = new Set();
  selectedComputerNumber: string = '';
  labs: any[] = [];
  selectedLab: any = null;
  canCreate = false;
  description: string = '';

  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(
    private labManaging: LabManaging,
    private cdr: ChangeDetectorRef,
    private permissionService: PermissionService,
    private issueService: IssueService,
    private authService: AuthService,
    private toastService: ToastService,
    private dialog: MatDialog
  ) {
    this.canCreate = this.permissionService.canManageIssues();
  }

  ngOnInit(): void {
    this.loadLabs();
    this.loadIssues();
  }

  loadLabs() {
    this.labManaging.getObjects().subscribe({
      next: (response: any) => {
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
          if (this.labs.length > 0) {
            this.selectedLab = this.labs[0];
            this.updateImageUrls();
          }
        } else {
          this.toastService.showError('Error al cargar los laboratorios.');
        }
        this.cdr.detectChanges();
      },
      error: () => {
        this.toastService.showError('Error al cargar los laboratorios.');
      },
    });
  }

  loadIssues() {
    //Obtener el usuario actual
    const currentUser = this.authService.getCurrentUser();

    if (!currentUser || !currentUser.email) {
      this.dataSource.data = []; 
      return;
    }

    this.issueService.getIssues().subscribe({
      next: (response) => {
        if (response && response.data && Array.isArray(response.data)) {
          const userIssues = response.data.filter(
            (issue: any) => issue.person && issue.person.email === currentUser.email
          );

          const issues = userIssues.map((issue: any) => ({
            lab: issue.lab || 'N/A',
            number: issue.issue
              ? issue.issue.map((i: any) => i.computer).join(', ')
              : issue.computers
              ? issue.computers.join(', ')
              : 'N/A',
            description: issue.issue
              ? issue.issue.map((i: any) => i.description).join('; ')
              : issue.description || 'Sin descripción',
            date: issue.date_issue || issue.date || 'N/A',
            issue:
              issue.issue ||
              issue.computers?.map((c: any) => ({
                computer: c,
                description: issue.description,
              })),
          }));

          this.dataSource = new MatTableDataSource(issues);
          this.cdr.detectChanges();
        } else {
          this.toastService.showError('Error al cargar los reportes, respuesta no válida.');
        }
      },
      error: () => {
        this.toastService.showError('Error al cargar los reportes.');
      },
    });
  }

  updateImageUrls() {
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
    if (!this.canCreate) {
      return;
    }

    const user = this.authService.getCurrentUser();
    if (!user) {
      this.toastService.showError('Debes iniciar sesión para reportar un problema.');
      return;
    }

    const issueData = {
      lab: this.selectedLab.lab_name,
      person: {
        email: user.email,
        student_name: user.name,
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
        if (response.message_code === 'ISSUE_SUCCESSFULLY_CREATED') {
          this.toastService.showSuccess('Reporte creado exitosamente.');

          const newIssue = {
            lab: issueData.lab,
            number: issueData.issue.map((i: any) => i.computer).join(', '),
            description: issueData.issue.map((i: any) => i.description).join('; '),
            date: new Date().toISOString(),
            issue: issueData.issue,
          };

          this.dataSource.data = [...this.dataSource.data, newIssue];

          if (this.table) {
            this.table.renderRows();
          }

          this.selectedImages.clear();
          this.description = '';
          this.updateSelectedComputerNumber();
          this.updateImageUrls();
          this.updateCanCreate();
        }
      },
      error: () => {
        this.toastService.showError('Error al crear el reporte.');
      },
    });
  }

  onRowClick(row: any) {
    this.dialog.open(VisualizationIssueDialogComponent, {
      width: '600px',
      data: row,
    });
  }
}