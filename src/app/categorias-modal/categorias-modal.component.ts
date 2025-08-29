import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoriaServices } from '../Services/categoriasServices';
import { ToastService } from '../Services/toaster.service';

@Component({
  selector: 'app-categorias-modal',
  templateUrl: './categorias-modal.component.html',
  styleUrl: './categorias-modal.component.css',
})
export class CategoriasModalComponent implements OnInit {
  categoryForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private toastService: ToastService,
    private _categoryService: CategoriaServices,
    private _dialogRef: MatDialogRef<CategoriasModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.categoryForm = this._fb.group({
      category_name: '',
    });
  }
  ngOnInit(): void {
    this.categoryForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.categoryForm.valid) {
      if (this.data) { 
        const categoriaActualizada = {
          ...this.categoryForm.value,
          _id: this.data._id
        };
  
        this._categoryService.ChangeCategory(categoriaActualizada).subscribe({
          next: (val: any) => {
            this.toastService.showSuccess("La categoria de modifico carrectamente.")
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
            this.toastService.showError("Hubo un error al modificar categoria.")
            this._dialogRef.close(true);
          },
        });
      } else { 
        this._categoryService.addCategory(this.categoryForm.value).subscribe({
          next: (val: any) => {
            this.toastService.showSuccess("La categoría se agregó correctamente.")
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
  

  CancelarDialog() {
    this._dialogRef.close();
  }
}
