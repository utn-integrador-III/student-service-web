import { Component, Inject } from '@angular/core';
import { ToastService } from '../../Services/toaster.service';

@Component({
  selector: 'app-example',
  template: `
    <button (click)="showSuccessMessage()">Mostrar Éxito</button>
    <button (click)="showErrorMessage()">Mostrar Error</button>
    <button (click)="showWarningMessage()">Mostrar Advertencia</button>
    <button (click)="showInfoMessage()">Mostrar Información</button>
  `,
  styles: [
    `
      button {
        margin: 5px;
        padding: 10px;
        font-size: 16px;
      }
    `
  ]
})
export class ExampleComponent {
  constructor(@Inject(ToastService) private toasterService: ToastService) {}

  showSuccessMessage() {
    this.toasterService.showSuccess('Operación exitosa', 'Éxito');
  }

  showErrorMessage() {
    this.toasterService.showError('Ha ocurrido un error', 'Error');
  }

  showWarningMessage() {
    this.toasterService.showWarning('Advertencia', 'Cuidado');
  }

  showInfoMessage() {
    this.toasterService.showInfo('Información importante', 'Info');
  }
}


