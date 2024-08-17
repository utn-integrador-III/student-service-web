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
import { SafekeeperService } from '../../Services/safekeeper/safekeeper.service';
import { forkJoin } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-lost-items',
  templateUrl: './lost-items.component.html',
  styleUrls: ['./lost-items.component.css'],
})
export class LostItemsComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;

  isDragOver = false;
  filePreview: string | ArrayBuffer | null = null;
  selectedFileName = 'No file selected';
  selectedCategories: { [key: string]: boolean } = {};
  selectedSafekeepers: { [email: string]: boolean } = {};
  form: FormGroup;
  categories: any[] = [];
  safekeepers: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<LostItemsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private srvCategorias: CategoriaServices,
    private toastr: ToastrService,
    private srvlostObjects: LostAndFoundService,
    private srvSafekeepers: SafekeeperService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadData();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      name: [this.data.name || '', Validators.required],
      description: [this.data.description || '', Validators.required],
      category: [[], [Validators.required, Validators.minLength(1)]],
      safekeeper: [[], [Validators.required, Validators.minLength(1)]], // Asegura que safekeeper también tenga validación
    });
  }

  loadData(): void {
    forkJoin({
      categories: this.srvCategorias.getAllCategories(),
      safekeepers: this.srvSafekeepers.getAllSafekeepers(),
    }).subscribe({
      next: (result: any) => {
        this.categories = result.categories.data;
        this.safekeepers = result.safekeepers.data;
        this.initializeSelectedItems();
      },
      error: (error) => {
        this.toastr.error('Error al cargar los datos.');
      },
    });
  }

  initializeSelectedItems(): void {
    const categories = Array.isArray(this.data.category)
      ? this.data.category
      : [];
    const safekeepers = Array.isArray(this.data.safekeeper)
      ? this.data.safekeeper
      : [];

    this.categories.forEach((category) => {
      this.selectedCategories[category.category_name] = categories.some(
        (cat: any) => cat.category_name === category.category_name
      );
    });

    this.safekeepers.forEach((safekeeper) => {
      this.selectedSafekeepers[safekeeper.email] = safekeepers.some(
        (sk: any) => sk.email === safekeeper.email
      );
    });

    this.updateFormControls();
  }

  updateFormControls(): void {
    this.form.patchValue({
      category: this.getSelectedCategories(),
      safekeeper: this.getSelectedSafekeepers(),
    });
    this.form.markAsDirty();
    this.validateSafekeepers();
  }

  getSelectedSafekeepers(): any[] {
    const selected = Object.keys(this.selectedSafekeepers).map((email) => ({
      email,
      accepted: false,
    }));
    return selected;
  }

  onSafekeeperChange(email: string, isChecked: boolean): void {
    if (isChecked) {
      this.selectedSafekeepers[email] = true;
    } else {
      delete this.selectedSafekeepers[email];
    }
    this.updateFormControls();
    this.validateSafekeepers();
  }

  validateSafekeepers(): void {
    const selectedSafekeepers = this.getSelectedSafekeepers();
    if (selectedSafekeepers.length === 0) {
      this.form.controls['safekeeper'].setErrors({ required: true });
    } else {
      this.form.controls['safekeeper'].setErrors(null);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.form.invalid) {
      this.toastr.error(
        'Por favor complete todos los campos obligatorios y seleccione al menos una categoría y un safekeeper.'
      );
      return;
    }

    const updatedObject = {
      _id: this.data._id,
      name: this.form.get('name')?.value,
      description: this.form.get('description')?.value,
      category: this.getSelectedCategories(),
      safekeeper: this.getSelectedSafekeepers(),
    };

    this.srvlostObjects.updateObjects(updatedObject).subscribe({
      next: (response) => {
        this.toastr.success('Objeto actualizado exitosamente');
        this.dialogRef.close(updatedObject);
      },
      error: (error: HttpErrorResponse) => {
        let errorMessage = 'Error desconocido al actualizar el objeto';
        if (error.error && typeof error.error === 'object') {
          errorMessage = JSON.stringify(error.error);
        } else if (typeof error.error === 'string') {
          errorMessage = error.error;
        }

        this.toastr.error(`Error al actualizar el objeto: ${errorMessage}`);
      },
    });
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
      this.handleFile(files[0]);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFile(input.files[0]);
    } else {
      this.selectedFileName = 'No file selected';
    }
  }

  handleFile(file: File): void {
    this.selectedFileName = file.name;
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
    return Object.keys(this.selectedCategories).filter(
      (key) => this.selectedCategories[key]
    );
  }
}
