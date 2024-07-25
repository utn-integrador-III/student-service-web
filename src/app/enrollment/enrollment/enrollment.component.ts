import { Component } from '@angular/core';
import { EnrollmentService } from './enrollment.service';

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

  constructor(private enrollmentService: EnrollmentService) {}

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
        this.message = 'Registro exitoso. Verifica tu correo electrónico.';
        this.closeRegisterModal();
        this.openVerifyModal();
      },
      error => {
        this.message = 'Error en el registro. Intenta de nuevo.';
      }
    );
  }

  verifyCode() {
    if (this.verificationCode && this.email) {
      this.enrollmentService.verifyCode(this.email, this.verificationCode).subscribe(
        response => {
          this.message = 'Código verificado exitosamente.';
          this.closeVerifyModal();
        },
        error => {
          this.message = 'Error verificando el código.';
        }
      );
    } else {
      this.message = 'Código y correo no pueden estar vacíos.';
    }
  }
}
