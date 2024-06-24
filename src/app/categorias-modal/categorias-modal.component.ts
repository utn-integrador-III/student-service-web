import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoriaServices } from '../Services/categoriasServices';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-categorias-modal',
  templateUrl: './categorias-modal.component.html',
  styleUrl: './categorias-modal.component.css'
})
export class CategoriasModalComponent implements OnInit{
  categoryForm: FormGroup;

  constructor(
    private _fb: FormBuilder, 
    private _categoryService: CategoriaServices, 
    private _dialogRef: MatDialogRef<CategoriasModalComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any) {
    this.categoryForm = this._fb.group({
      category_name: ''
    })
  }
  ngOnInit(): void {
    this.categoryForm.patchValue(this.data);
  }

  onFormSummit() {
    if (this.categoryForm.valid) {
      if(this.data){
        this._categoryService.actualizarCategoria(this.data._id,this.categoryForm.value).subscribe({
          next: (val: any) => {
            alert('Se modifico');
          },
          error: (err: any) => {
            console.error(err);
          }
        })
      }else{
        this._categoryService.addCategory(this.categoryForm.value).subscribe({
          next: (val: any) => {
            alert('La categoria se agrego Correctamente');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        })
      }
  
    }
  }


  CancelarDialog() {
    this._dialogRef.close();
  }
}
