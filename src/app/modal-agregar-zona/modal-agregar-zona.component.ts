import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-agregar-zona',
  templateUrl: './modal-agregar-zona.component.html',
  styleUrls: ['./modal-agregar-zona.component.css']
})
export class ModalAgregarZonaComponent {
  nombre: string = '';
  localidad: string = '';

  constructor(public dialogRef: MatDialogRef<ModalAgregarZonaComponent>) {}

  guardar(): void {
    this.dialogRef.close({ nombre: this.nombre, localidad: this.localidad });
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
