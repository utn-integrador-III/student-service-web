import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(form: NgForm) {
    if (form.valid) {
      const { username, password } = form.value;
      this.authService.login(username, password).subscribe(
        success => {
          if (success) {
            this.router.navigate(['/home']);
          } else {
            this.errorMessage = 'Credenciales incorrectas';
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
