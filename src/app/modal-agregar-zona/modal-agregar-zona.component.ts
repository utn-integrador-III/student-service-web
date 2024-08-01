import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { ToastService } from '../Services/toaster.service';

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
    private toasterService: ToastService
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
        this.toasterService.showWarning(
          'Debe actualizar algún dato antes de guardar',
          'Advertencia'
        );
      } else {
        this.dialogRef.close({
          nombre: this.nombre,
          localidad: this.localidad,
        });
      }
    } else {
      this.toasterService.showError(
        'Formulario inválido. Por favor, completa todos los campos.',
        'Error'
      );
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
