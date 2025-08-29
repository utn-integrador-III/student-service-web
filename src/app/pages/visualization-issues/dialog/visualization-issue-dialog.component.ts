import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IssueService } from '../../../Services/issue/issue.service';
import { ToastService } from '../../../Services/toaster.service';

@Component({
  selector: 'app-visualization-issue-dialog',
  templateUrl: './visualization-issue-dialog.component.html',
  styleUrls: ['./visualization-issue-dialog.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class VisualizationIssueDialogComponent implements OnInit {
  lab: string = '';
  computer: string = '';
  description: string = '';
  status: string = '';
  statusOptions: string[] = [
    'Pendiente',
    'En progreso',
    'Completado',
    'Rechazado',
  ];

  constructor(
    public dialogRef: MatDialogRef<VisualizationIssueDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private issueService: IssueService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.lab = this.data.lab;
      this.computer = this.data.number;
      this.description = this.data.description;
      this.status = this.data.status || 'Pendiente';
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    const updatedData = {
      lab: this.lab,
      status: this.status,
      issue: this.data.issue.map((i: any) => ({
        ...i,
        description: this.description,
      })),
    };

    this.issueService
      .updateIssueStatusOrComment(this.data._id, updatedData)
      .subscribe({
        next: (response) => {
          if (response.message_code === 'ISSUE_SUCCESSFULLY_UPDATED') {
            this.toastService.showSuccess('Avería actualizada exitosamente.');
            this.dialogRef.close(true);
          } else {
            this.toastService.showError('Error al actualizar la avería.');
            this.dialogRef.close(false);
          }
        },
        error: () => {
          this.toastService.showError('Error al actualizar la avería.');
          this.dialogRef.close(false);
        },
      });
  }
}
