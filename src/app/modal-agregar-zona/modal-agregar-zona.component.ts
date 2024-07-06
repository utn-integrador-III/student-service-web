import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-agregar-zona',
  templateUrl: './modal-agregar-zona.component.html',
  styleUrls: ['./modal-agregar-zona.component.css'],
})
export class ModalAgregarZonaComponent {
  nombre: string = '';
  localidad: string = '';
  originalNombre: string = '';
  originalLocalidad: string = '';

  constructor(
    public dialogRef: MatDialogRef<ModalAgregarZonaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar
  ) {
    if (data.zona) {
      this.nombre = data.zona.name || '';
      this.localidad = data.zona.location || '';
      this.originalNombre = this.nombre;
      this.originalLocalidad = this.localidad;
    }
  }

  guardar(form: NgForm): void {
    if (form.valid) {
      if (
        this.nombre === this.originalNombre &&
        this.localidad === this.originalLocalidad
      ) {
        this.snackBar.open(
          'Debe actualizar algún dato antes de guardar',
          'Cerrar',
          {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          }
        );
      } else {
        this.dialogRef.close({
          nombre: this.nombre,
          localidad: this.localidad,
        });
      }
    } else {
      this.snackBar.open(
        'Formulario inválido. Por favor, completa todos los campos.',
        'Cerrar',
        {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        }
      );
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
