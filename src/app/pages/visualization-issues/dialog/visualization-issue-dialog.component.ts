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
  statusOptions: { value: string; label: string }[] = [
    { value: 'Pending', label: 'Pendiente' },
    { value: 'In Progress', label: 'En progreso' },
    { value: 'Completed', label: 'Completado' },
    { value: 'Rejected', label: 'Rechazado' },
  ];

  observations: string = '';

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
      this.description = this.data.issue[0]?.description || '';
      this.status = this.data.status || 'Pending';
      this.observations = this.data.observations || '';
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (!this.description || !this.observations || !this.status) {
      this.toastService.showError(
        'La descripción, las observaciones y el estado son obligatorios.'
      );
      return;
    }

    const updatedData = {
      _id: this.data._id,
      issue: this.data.issue.map((i: any) => ({
        ...i,
        description: this.description,
      })),
      observations: this.observations,
      status: this.status,
      email: this.data.person.email,
    };

    this.issueService
      .updateIssueStatusOrComment(updatedData._id, updatedData)
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
