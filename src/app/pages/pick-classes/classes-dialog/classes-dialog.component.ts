import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-classes-dialog',
  standalone: true,
  imports: [],
  templateUrl: './classes-dialog.component.html',
  styleUrl: './classes-dialog.component.css',
})
export class ClassesDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ClassesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
