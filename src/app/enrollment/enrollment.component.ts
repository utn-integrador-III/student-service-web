import { Component } from '@angular/core';
import { EnrollmentService } from './enrollment.service';
import { ToastService } from '../services/toaster.service';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  verificationCode: string = '';
  showRegisterModal: boolean = false;
  showVerifyModal: boolean = false;
  message: string = '';

  constructor(private enrollmentService: EnrollmentService, private toastService: ToastService) {}  // Inyecta el ToastService

  openRegisterModal() {
    this.showRegisterModal = true;
  }

  closeRegisterModal() {
    this.showRegisterModal = false;
  }

  openVerifyModal() {
    this.showVerifyModal = true;
  }

  closeVerifyModal() {
    this.showVerifyModal = false;
  }

  onSubmit() {
    const userData = { name: this.name, email: this.email, password: this.password };
    this.enrollmentService.enrollUser(userData).subscribe(
      response => {
        this.toastService.showSuccess('Registro exitoso. Verifica tu correo electrónico.');  // Mensaje de éxito
        this.closeRegisterModal();
        this.openVerifyModal();
      },
      error => {
        this.toastService.showError('Error en el registro. Intenta de nuevo.');  // Mensaje de error
      }
    );
  }

  verifyCode() {
    if (this.verificationCode && this.email) {
      this.enrollmentService.verifyCode(this.email, this.verificationCode).subscribe(
        response => {
          this.toastService.showSuccess('Código verificado exitosamente.');  // Mensaje de éxito
          this.closeVerifyModal();
        },
        error => {
          this.toastService.showError('Error verificando el código.');  // Mensaje de error
        }
      );
    } else {
      this.toastService.showWarning('Correo y código no pueden estar vacíos.');  // Mensaje de advertencia
    }
  }
}
