import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-agregar-zona',
  templateUrl: './modal-agregar-zona.component.html',
  styleUrls: ['./modal-agregar-zona.component.css']
})
export class ModalAgregarZonaComponent {
  @Output() zonaGuardada = new EventEmitter<string>(); // Evento de salida para notificar que se guardó la zona
  nombre: string = '';
  localidad: string = '';

  constructor(public activeModal: NgbActiveModal) {}

  guardar(): void {
    // Aquí iría la lógica para guardar la zona, por ejemplo:
    // Llamar a un servicio, enviar los datos al backend, etc.
    // Emitir el evento indicando que se guardó la zona
    this.zonaGuardada.emit('Zona guardada exitosamente');
    // Cerrar la modal
    this.activeModal.close();
  }

  cancelar(): void {
    // Cerrar la modal sin guardar cambios
    this.activeModal.dismiss();
  }
}
