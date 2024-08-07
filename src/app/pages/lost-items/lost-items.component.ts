import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaServices } from '../../Services/categoriasServices';
import { ToastrService } from 'ngx-toastr';
import { LostAndFoundService } from '../../Services/service-LostAndFound/LostAndFound.service';

@Component({
  selector: 'app-lost-items',
  templateUrl: './lost-items.component.html',
  styleUrls: ['./lost-items.component.css'],
})
export class LostItemsComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;

  isDragOver = false;
  filePreview: string | ArrayBuffer | null = null;
  selectedFileName: string = 'No file selected';
  selectedCategories: { [key: string]: boolean } = {};
  form: FormGroup;
  categories: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<LostItemsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private srvCategorias: CategoriaServices,
    private toastr: ToastrService,
    private srvlostObjects: LostAndFoundService
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      name: [this.data.name || '', Validators.required],
      description: [this.data.description || '', Validators.required],
      category: [this.data.category || [], Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.form.invalid) {
      this.toastr.error('Por favor complete todos los campos obligatorios.');
      return;
    }

    const selectedCategories = this.getSelectedCategories();

    const updatedObject = {
      _id: this.data._id,
      name: this.form.get('name')?.value,
      description: this.form.get('description')?.value,
      category: selectedCategories,
    };

    this.srvlostObjects.updateObjects(updatedObject).subscribe(
      (response) => {
        this.toastr.success('Objeto actualizado exitosamente');
        this.dialogRef.close(updatedObject);
      },
      (error) => {
        this.toastr.error('Error al actualizar el objeto');
      }
    );
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
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFileName = file.name;
      this.handleFile(file);
    } else {
      this.selectedFileName = 'No file selected';
    }
  }

  handleFile(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.filePreview = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  onDelete(): void {
    this.filePreview = null;
    this.selectedFileName = 'No file selected';
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  loadCategories() {
    this.srvCategorias.getAllCategories().subscribe(
      (response: any) => {
        this.categories = response.data;
        this.initializeSelectedCategories();
      },
      (error) => {
        this.toastr.error('Error al cargar las categorías.');
      }
    );
  }

  initializeSelectedCategories() {
    const categories = Array.isArray(this.data.category)
      ? this.data.category
      : [];
    this.categories.forEach((category) => {
      this.selectedCategories[category.category_name] = categories.some(
        (cat: any) => cat.category_name === category.category_name
      );
    });
    this.updateCategoryFormControl();
  }

  onCategoryChange(categoryName: string, isChecked: boolean): void {
    this.selectedCategories[categoryName] = isChecked;
    this.updateCategoryFormControl();
  }

  updateCategoryFormControl(): void {
    const selectedCategories = this.getSelectedCategories();
    this.form.patchValue(
      { category: selectedCategories },
      { emitEvent: false }
    );
  }

  getSelectedCategories(): string[] {
    const selected = [];
    for (const key in this.selectedCategories) {
      if (this.selectedCategories[key]) {
        selected.push(key);
      }
    }
    return selected;
  }
}
