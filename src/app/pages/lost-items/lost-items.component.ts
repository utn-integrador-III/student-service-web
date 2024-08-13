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
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadSafekeepers();
  }

  loadSafekeepers(): void {
    this.srvSafekeepers.getAllSafekeepers().subscribe(
      (response: any) => {
        this.safekeepers = response.data;
        this.initializeSelectedSafekeepers();
      },
      (error) => {
        this.toastr.error('Error al cargar los safekeepers.');
        console.log(error);
      }
    );
  }

  initializeSelectedSafekeepers(): void {
    const safekeepers = Array.isArray(this.data.safekeeper)
      ? this.data.safekeeper
      : [];
    this.safekeepers.forEach((safekeeper) => {
      this.selectedSafekeepers[safekeeper.email] = safekeepers.some(
        (sk: any) => sk.email === safekeeper.email
      );
    });
  }

  getSelectedSafekeepers(): any[] {
    return Object.keys(this.selectedSafekeepers)
      .filter((email) => this.selectedSafekeepers[email])
      .map((email) => ({ email, accepted: false }));
  }

  onSafekeepersChange(): void {
    this.form.patchValue({
      safekeepers: this.getSelectedSafekeepers(),
    });
  }

  initializeForm(): void {
    this.form = this.fb.group({
      name: [this.data.name || '', Validators.required],
      description: [this.data.description || '', Validators.required],
      category: [this.data.category || [], Validators.required],
      safekeeper: [this.data.safekeeper || [], Validators.required],
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

    const updatedObject = {
      _id: this.data._id,
      ...this.form.value,
    };

    console.log(updatedObject);
    this.srvlostObjects.updateObjects(updatedObject).subscribe(
      (response) => {
        window.location.reload();
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
    return Object.keys(this.selectedCategories).filter(
      (key) => this.selectedCategories[key]
    );
  }
}
