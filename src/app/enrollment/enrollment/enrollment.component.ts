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
  showVerification: boolean = false;
  message: string = '';

  constructor(private enrollmentService: EnrollmentService) {}

  onSubmit() {
    const userData = { name: this.name, email: this.email, password: this.password };
    this.enrollmentService.enrollUser(userData).subscribe(
      response => {
        this.showVerification = true;
        this.message = 'Registro exitoso. Verifica tu correo electrónico.';
      },
      error => {
        this.message = 'Error en el registro. Intenta de nuevo.';
      }
    );
  }

  verifyCode() {
    if (this.verificationCode) {
      this.enrollmentService.verifyCode(this.verificationCode).subscribe(
        response => {
          this.message = 'Código verificado exitosamente.';
        },
        error => {
          this.message = 'Error verificando el código.';
        }
      );
    } else {
      this.message = 'Código no puede estar vacío.';
    }
  }
}
