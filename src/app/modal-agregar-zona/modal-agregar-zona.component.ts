import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-agregar-zona',
  templateUrl: './modal-agregar-zona.component.html',
  styleUrls: ['./modal-agregar-zona.component.css']
})
export class ModalAgregarZonaComponent {
  nombre: string = '';
  localidad: string = '';

  constructor(
    public dialogRef: MatDialogRef<ModalAgregarZonaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.zona) {

      this.nombre = data.zona.name || '';
      this.localidad = data.zona.location || '';
    }
  }

  guardar(): void {
    this.dialogRef.close({ nombre: this.nombre, localidad: this.localidad });
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
