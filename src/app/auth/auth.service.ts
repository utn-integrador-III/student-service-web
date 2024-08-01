import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../login/store/login.action';
import { IAuthResponse } from '../login/models/login.interface';
import { IAuth } from '../login/models/login.model';
import { ToastService } from '../Services/toaster.service';
import { Router } from '@angular/router';
import { error_message_handler } from '../shared/helper/error-message.handler';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private subscriptionUser: Subscription;
  private readonly JWT_TOKEN = 'JWT_TOKEN'
  private userAuthenticate: IAuth;
  private apiUrl = environment.URL_AUTH !== '' ? environment.URL_AUTH : '/api/auth';

  constructor(
    private store: Store<fromApp.AppState>,
    private http: HttpClient,
    private toastService: ToastService,
    private router: Router
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
          this.storeJwtToken(user.token)
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

  refreshToken() {
    const currentToken = this.getToken();  // Ensure you're retrieving the current token correctly
    return this.http.post<any>(`${environment.URL_REFRESH}`, { token: currentToken })
      .pipe(
        tap((response: any) => {
          if (response && response.data && response.data.token) {
            const updatedUser = {
              ...this.userAuthenticate,
              token: response.data.token
            };
  
            // Dispatch an action to update the user state with the new token
            this.store.dispatch(new AuthActions.AuthenticateUser(updatedUser));
            this.storeJwtToken(response.data.token)
          } else {
            console.error('Token refresh failed: Invalid response structure', response);
          }
        }),
        catchError(error => {
          console.error('Token refresh error:', error);
          throw error;  // Rethrow or handle error appropriately
        })
      );
  }
  
  private storeJwtToken(jwt: string){
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  logout() {
    this.store.dispatch(new AuthActions.LogoutUser());
    this.toastService.showSuccess('Session closed successfully', 'Success');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.userAuthenticate && !!this.userAuthenticate.token;
  }
  
  isLoggedIn(){
    return !!localStorage.getItem(this.JWT_TOKEN);
  }

  getToken(): string {
    return this.userAuthenticate?.token || '';
  }

  getAuthentication() {
    this.subscriptionUser = this.store.select('auth').subscribe(authStore => {
      this.userAuthenticate = authStore?.auth;
    });
  }
}
