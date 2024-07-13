import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { IAuthResponse } from './models/login.interface';
import { ToastService } from '../services/toaster.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router,  private toastService: ToastService ) {}

  onLogin(form: NgForm) {
    if (form.valid) {
      const { username, password } = form.value;
      this.authService.login(username, password).subscribe(
        (response: IAuthResponse) => {
          if (response.isError) {
            this.errorMessage = response.errorMessage || 'Credenciales incorrectas';
          } else {
            this.toastService.showSuccess('Inicio de sesión exitoso', 'Éxito'); 
            this.router.navigate(['/home']);
          }
        },
        error => {
          console.error('Login failed', error);
          this.errorMessage = 'Ocurrió un error durante el inicio de sesión';
        }
      );
    }
  }
}