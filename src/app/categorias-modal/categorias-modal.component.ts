import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
        this._categoryService
          .actualizarCategoria(this.data._id, this.categoryForm.value)
          .subscribe({
            next: (val: any) => {
              console.log(this.data._id);
              console.log(this.categoryForm.value);
              alert('Se modificó');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
              alert(`Hubo un error`);
              this._dialogRef.close(true);
            },
          });
      } else {
        this._categoryService.addCategory(this.categoryForm.value).subscribe({
          next: (val: any) => {
            alert('La categoría se agregó correctamente');
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
