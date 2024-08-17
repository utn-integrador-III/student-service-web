import { Component } from '@angular/core';
import { ResetPasswordService } from './reset-password.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  email: string = '';

  constructor(
    private resetPasswordService: ResetPasswordService, 
    private router: Router
  ) { }

  onSubmit() {
    if (this.email) {
      const resetData = { email: this.email };

      this.resetPasswordService.resetPassword(resetData).subscribe({
        next: (response) => {
          // Mostrar un alert y redirigir
          alert('Proceso de restablecimiento iniciado. Revisa tu correo. Seras redirigido a una nueva pàgina donde podràs usar tu contraseña temporal para cambiarla por una nueva');
          this.router.navigate(['/cambiocontraseña']);  // Redirigir al usuario después de confirmar el alert
        },
        error: (error) => {
          alert('Error al restablecer la contraseña. Inténtalo de nuevo. Revisa que el correo sea vàlido');
        }
      });
    }
  }
}





