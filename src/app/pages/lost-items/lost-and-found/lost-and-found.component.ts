import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-lost-and-found',
  templateUrl: './lost-and-found.component.html',
  styleUrls: ['./lost-and-found.component.css'],
})
export class LostAndFoundComponent {
  displayedColumns: string[] = [
    'image',
    'name',
    'place',
    'category',
    'accions',
  ];
  dataSource = new MatTableDataSource();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  previewImage(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imagePreview = document.getElementById(
          'image-preview'
        ) as HTMLImageElement;
        imagePreview.src = e.target.result;
        imagePreview.style.display = 'block';
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    const imagePreview = document.getElementById(
      'image-preview'
    ) as HTMLImageElement;
    const fileInput = document.getElementById('item-image') as HTMLInputElement;

    imagePreview.src = '#';
    imagePreview.style.display = 'none';
    fileInput.value = '';
  }
  clearForm() {
    this.dataSource.filter = '';
    this.resetImagePreview();
  }

  resetImagePreview() {
    const imagePreview = document.getElementById(
      'image-preview'
    ) as HTMLImageElement;
    const fileInput = document.getElementById('item-image') as HTMLInputElement;

    imagePreview.src = '#';
    imagePreview.style.display = 'none';
    if (fileInput) {
      fileInput.value = '';
    }
  }
  resetModalFields() {
    const fileInput = document.getElementById('item-image') as HTMLInputElement;
    const imagePreview = document.getElementById(
      'image-preview'
    ) as HTMLImageElement;
    const itemNameInput = document.getElementById(
      'item-name'
    ) as HTMLInputElement;
    const itemCategoryInput = document.getElementById(
      'item-category'
    ) as HTMLInputElement;
    const itemLocationInput = document.getElementById(
      'item-location'
    ) as HTMLInputElement;

    if (fileInput) {
      fileInput.value = '';
    }
    if (imagePreview) {
      imagePreview.src = '#';
      imagePreview.style.display = 'none';
    }
    if (itemNameInput) {
      itemNameInput.value = '';
    }
    if (itemCategoryInput) {
      itemCategoryInput.value = '';
    }
    if (itemLocationInput) {
      itemLocationInput.value = '';
    }
  }

  closeModal() {
    this.clearForm();
    this.resetModalFields();
  }
}
