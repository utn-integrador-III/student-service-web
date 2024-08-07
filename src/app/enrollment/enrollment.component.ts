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

  constructor(private enrollmentService: EnrollmentService, private toastService: ToastService) {}

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
    if (!this.name || !this.email || !this.password) {
      this.toastService.showWarning('Todos los campos son obligatorios.');  // Mensaje de advertencia
      return;
    }

    const userData = { name: this.name, email: this.email, password: this.password };
    this.enrollmentService.enrollUser(userData).subscribe(
      response => {
        this.toastService.showSuccess('Registro exitoso. Verifica tu correo electrónico.');
        this.closeRegisterModal();
        this.openVerifyModal();
      },
      error => {
        this.toastService.showError(error.message);
      }
    );
  }

  verifyCode() {
    if (!this.email || !this.verificationCode) {
      this.toastService.showWarning('Correo y código no pueden estar vacíos.');
      return;
    }

    this.enrollmentService.verifyCode(this.email, this.verificationCode).subscribe(
      response => {
        this.toastService.showSuccess('Código verificado exitosamente.');
        this.closeVerifyModal();
      },
      error => {
        this.toastService.showError(error.message);
      }
    );
  }
}
