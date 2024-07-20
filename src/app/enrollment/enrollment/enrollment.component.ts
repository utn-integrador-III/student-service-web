import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EnrollmentService } from '../enrollment.service';

@Component({
  selector: 'app-enrollment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  verificationCode: string = '';
  message: string = '';
  showVerification: boolean = false;

  constructor(private enrollmentService: EnrollmentService) {}

  onSubmit() {
    if (!this.name || this.name.length < 2) {
      this.message = 'El nombre debe tener al menos 2 caracteres';
      return;
    }

    if (!this.email || !this.email.includes('utn.ac.cr')) {
      this.message = 'El correo electrónico debe ser una dirección de correo válida de UTN';
      return;
    }

    if (!this.password || this.password.length < 8) {
      this.message = 'La contraseña debe tener al menos 8 caracteres';
      return;
    }

    this.enrollmentService.enroll(this.name, this.email, this.password).subscribe(
      (response: any) => {
        this.message = response.message;
        if (response.status === 'success' || response.statusCode === 200) {
          this.showVerification = true;
          console.log('Usuario creado, mostrando campo de verificación.'); // Log para depuración
        }
      },
      (error) => {
        this.message = `${error.status} ${error.statusText}: ${error.error.message}`;
      }
    );
  }

  verifyCode() {
    this.enrollmentService.verify(this.email, this.verificationCode).subscribe(
      (response: any) => {
        this.message = response.message;
        if (response.status === 'success') {
          this.message = 'Usuario verificado y registrado con éxito.';
          this.showVerification = false;
          console.log('Código verificado, usuario registrado.'); // Log para depuración
        }
      },
      (error) => {
        this.message = error.message;
      }
    );
  }
}
