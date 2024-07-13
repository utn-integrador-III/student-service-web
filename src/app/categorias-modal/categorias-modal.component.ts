import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../services/toaster.service';
import { CategoriaServices } from '../Services/categoriasServices';

@Component({
  selector: 'app-categorias-modal',
  templateUrl: './categorias-modal.component.html',
  styleUrl: './categorias-modal.component.css',
})
export class CategoriasModalComponent implements OnInit {
  categoryForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _categoryService: CategoriaServices,
    private _dialogRef: MatDialogRef<CategoriasModalComponent>,
    private toasterService: ToastService,
    
  @Inject(MAT_DIALOG_DATA) public data: any) {
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
        this._categoryService.actualizarCategoria(this.data._id, this.categoryForm.value).subscribe({
          next: (val: any) => {
            console.log(this.data._id);
            console.log(this.categoryForm.value);
            this.toasterService.showSuccess('Se modificó correctamente', 'Éxito');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
            this.toasterService.showError('Hubo un error al modificar la categoría', 'Error');
            this._dialogRef.close(true);
          }
        });
      } else {
        this._categoryService.addCategory(this.categoryForm.value).subscribe({
          next: (val: any) => {
            this.toasterService.showSuccess('La categoría se agregó correctamente', 'Éxito');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
            this.toasterService.showError('Error al agregar zona', '400 Bad Request');
          }
        });
      }
    }
  }

  CancelarDialog() {
    this._dialogRef.close();
  }
}
