import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-show-dialog',
  templateUrl: './show-dialog.component.html',
  styleUrls: ['./show-dialog.component.css'],
})
export class ShowDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ShowDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public element: any
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  onEdit(): void {
    this.dialogRef.close({ action: 'edit', data: this.element });
  }

  onDelete(): void {
    this.dialogRef.close({ action: 'delete', data: this.element });
  }
}
