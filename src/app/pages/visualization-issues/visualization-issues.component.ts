import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { IssueService } from '../../Services/issue/issue.service';
import { ToastService } from '../../Services/toaster.service';
import { VisualizationIssueDialogComponent } from './dialog/visualization-issue-dialog.component';

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
            description: issue.issue
              ? issue.issue.map((i: any) => i.description).join('; ')
              : 'Sin descripción',
            date: issue.date_issue || 'N/A',
            status: issue.status || 'Pendiente',
            issue: issue.issue,
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openEditDialog(element: any) {
    const dialogRef = this.dialog.open(VisualizationIssueDialogComponent, {
      width: '600px',
      panelClass: 'custom-dialog-container', // ⬅️ aquí se engancha tu CSS
      data: { ...element },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadIssues();
      }
    });
  }

  onDeleteClick(element: any) {
    if (confirm('¿Estás seguro de que quieres eliminar esta avería?')) {
      this.issueService.deleteIssue(element._id).subscribe({
        next: (response) => {
          if (response.message_code === 'ISSUE_SUCCESSFULLY_DELETED') {
            this.toastService.showSuccess('Avería eliminada exitosamente.');
            this.loadIssues();
          } else {
            this.toastService.showError('Error al eliminar la avería.');
          }
        },
        error: () => {
          this.toastService.showError('Error al eliminar la avería.');
        },
      });
    }
  }
}
