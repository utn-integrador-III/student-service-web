import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../Services/toaster.service';
import { NgForm } from '@angular/forms';
import { IAuthResponse } from '../login/models/login.interface';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app/store/app.reducer';
import { IAuth } from '../login/models/login.model';
import { ChangePassword } from '../interfaces/changePasswordInterface';
import {ChangePasswordService} from '../Services/changePasswordService'

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  userAuthenticated: IAuth;
  menuOpen: boolean = false;
  welcomeMessage: string;
  errorMessage: string | null = null;
  

  constructor(
    private _changePassword: ChangePasswordService,
    private router: Router,  private toastService: ToastService,  private store: Store<fromApp.AppState>,) {}

  ngOnInit(): void {
    this.store.select('auth').subscribe((authState) => {
      this.userAuthenticated = authState.auth;
      this.welcomeMessage = `Bienvenid@ ${this.userAuthenticated?.name}`;
    });
  }

  ChangePassword(form: NgForm) {
    if (form.valid) {
      const { user_email, old_password, new_password, confirm_password } = form.value;
       if (new_password !== confirm_password) {
        this.toastService.showError('La nueva contraseña y la confirmación no coinciden. Por favor, verifica e inténtalo de nuevo.');
      }else{
        this._changePassword
            .changePassword(form.value)
            .subscribe({
              next: (val: any) => {
                this.toastService.showSuccess('Tu contraseña ha sido actualizada exitosamente.');
                this.router.navigate(['/home']);
              },
              error: (err: any) => {
                console.error(err);
                this.toastService.showError(`Ocurrió un error inesperado al intentar cambiar la contraseña.`);
              }
      });
  }
}

    
}
}