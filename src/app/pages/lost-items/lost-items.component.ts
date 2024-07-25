import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-lost-items',
  templateUrl: './lost-items.component.html',
  styleUrls: ['./lost-items.component.css'],
})
export class LostItemsComponent {
  isDragOver = false;
  filePreview: string | ArrayBuffer | null = null;

  constructor(
    public dialogRef: MatDialogRef<LostItemsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      this.handleFile(file);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const fileName = input.files?.length
      ? input.files[0].name
      : 'No file selected';
    const fileNameElement = document.querySelector('.file-name');

    if (fileNameElement) {
      fileNameElement.textContent = fileName;
    }

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.handleFile(file);
    }
  }

  handleFile(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.filePreview = e.target.result;
      this.data.imageUrl = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  onDelete(): void {
    this.filePreview = null;

    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (input) {
      input.value = ''; // Clear the file input
    }

    const fileNameElement = document.querySelector('.file-name');
    if (fileNameElement) {
      fileNameElement.textContent = 'No file selected';
    }
  }
}
