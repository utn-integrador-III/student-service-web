import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../login/store/login.action';
import { IAuthResponse } from '../login/models/login.interface';
import { IAuth } from '../login/models/login.model';
import { error_message_handler } from '../shared/helper/error-message.handler';
import { ToastService } from '../services/toaster.service';
import { Router } from '@angular/router'; // Importa Router para la navegación

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private subscriptionUser: Subscription;
  private userAuthenticate: IAuth;
  private apiUrl =
    environment.URL_AUTH !== '' ? environment.URL_AUTH : '/api/auth';

  constructor(
    private store: Store<fromApp.AppState>,
    private http: HttpClient,
    private toastService: ToastService,
    private router: Router // Incluye Router en el constructor
  ) {
    this.getAuthentication();
  }

  ngOnDestroy() {
    if (this.subscriptionUser) {
      this.subscriptionUser.unsubscribe();
    }
  }

  login(email: string, password: string): Observable<IAuthResponse> {
    let result = new IAuthResponse();
    return this.http.post<any>(this.apiUrl, { email, password }).pipe(
      map((response) => {
        if (
          response &&
          response.data &&
          response.message_code === 'USER_AUTHENTICATED'
        ) {
          let user: IAuth = {
            email: response.data.email,
            name: response.data.name,
            role: response.data.role,
            status: response.data.status,
            token: response.data.token,
          };
          this.store.dispatch(new AuthActions.AuthenticateUser(user));
          result.auth = user;
          this.toastService.showSuccess('Inicio de sesión exitoso', 'Éxito');
        } else {
          result.isError = true;
          this.toastService.showError(
            'Error en el inicio de sesión. Por favor, inténtelo de nuevo.'
          );
        }
        return result;
      }),
      catchError((error: any) => {
        console.log('error: ', error);
        result.isError = true;
        if (error.status === 404) {
          this.toastService.showError(
            'Endpoint no encontrado. Verifique la URL.'
          );
        } else if (
          error.error &&
          error.error.message_code === 'INVALID_CREDENTIALS'
        ) {
          result.errorMessage =
            'El correo electrónico o la contraseña no son correctos.';
          this.toastService.showError(result.errorMessage);
        } else if (
          error.error &&
          error.error.message_code === 'USER_NOT_ACTIVE'
        ) {
          result.errorMessage =
            'Debe activar su cuenta antes de iniciar sesión.';
          this.toastService.showWarning(result.errorMessage);
        } else {
          result.errorMessage = error_message_handler(error);
          this.toastService.showError(result.errorMessage);
        }
        this.store.dispatch(new AuthActions.LogoutUser());
        return of(result);
      })
    );
  }

  logout() {
    // Limpia los datos de autenticación
    this.store.dispatch(new AuthActions.LogoutUser());
    this.toastService.showSuccess('Se cerró sesión exitosamente', 'Éxito');
    // Redirige al usuario a la página de inicio de sesión
    this.router.navigate(['/login']);
  }

  getAuthentication() {
    this.subscriptionUser = this.store.select('auth').subscribe((authStore) => {
      this.userAuthenticate = authStore?.auth;
    });
  }

  isAuthenticated(): boolean {
    return !!this.userAuthenticate && !!this.userAuthenticate.token;
  }

  getToken(): string {
    return this.userAuthenticate?.token || '';
  }
}
