import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { IssueService } from '../../Services/issue/issue.service';
import { ToastService } from '../../Services/toaster.service';
import { VisualizationIssueDialogComponent } from './dialog/visualization-issue-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-visualization-issues',
  templateUrl: './visualization-issues.component.html',
  styleUrls: ['./visualization-issues.component.css'],
})
export class VisualizationIssuesComponent implements OnInit {
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  displayedColumns: string[] = [
    'lab',
    'computer',
    'description',
    'date',
    'status',
    'actions',
  ];

  constructor(
    private issueService: IssueService,
    private cdr: ChangeDetectorRef,
    private toastService: ToastService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadIssues();
  }

  loadIssues() {
    this.issueService.getIssues().subscribe({
      next: (response) => {
        if (response && response.data && Array.isArray(response.data)) {
          const issues = response.data.map((issue: any) => ({
            _id: issue._id,
            lab: issue.lab || 'N/A',
            number: issue.issue
              ? issue.issue.map((i: any) => i.computer).join(', ')
              : 'N/A',
            description:
              issue.issue && issue.issue.length > 0
                ? issue.issue[0].description
                : 'Sin descripción',
            date: issue.date_issue || 'N/A',
            status: issue.status || 'Pending',
            issue: issue.issue,
            person: issue.person,
          }));
          this.dataSource = new MatTableDataSource(issues);
          this.cdr.detectChanges();
        } else {
          this.toastService.showError(
            'Error al cargar los reportes: respuesta no válida.'
          );
        }
      },
      error: () => {
        this.toastService.showError('Error al cargar los reportes.');
      },
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Pendiente':
        return 'status-pending';
      case 'En progreso':
        return 'status-in-progress';
      case 'Completado':
        return 'status-completed';
      default:
        return 'status-unknown';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'Pending':
        return 'Pendiente';
      case 'In Progress':
        return 'En progreso';
      case 'Completed':
        return 'Completado';
      case 'Rejected':
        return 'Rechazado';
      default:
        return status;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openEditDialog(element: any) {
    const dialogRef = this.dialog.open(VisualizationIssueDialogComponent, {
      width: '600px',
      panelClass: 'custom-dialog-container',
      data: { ...element },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadIssues();
      }
    });
  }

  onDeleteClick(issue: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmar eliminación',
        message: `¿Deseas eliminar el issue del laboratorio ${issue.lab}?`,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.issueService.deleteIssue(issue._id).subscribe({
          next: (res) => {
            this.toastService.showSuccess('Issue eliminado con éxito');
            this.loadIssues();
          },
          error: (err) => {
            this.toastService.showError('Error al eliminar el issue');
          },
        });
      }
    });
  }
}
