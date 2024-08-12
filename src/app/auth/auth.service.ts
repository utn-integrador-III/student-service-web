import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import {
  Observable,
  of,
  Subscription,
  BehaviorSubject,
  throwError,
} from 'rxjs';
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
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private apiUrl = environment.URL_AUTH || '/api/auth';
  private authStateSubject = new BehaviorSubject<boolean>(false);
  authStateChanged = this.authStateSubject.asObservable();

  constructor(
    private store: Store<fromApp.AppState>,
    private http: HttpClient,
    private toastService: ToastService,
    private router: Router
  ) {
    this.initAuthListener();
  }

  ngOnDestroy() {
    if (this.subscriptionUser) {
      this.subscriptionUser.unsubscribe();
    }
  }

  initAuthListener() {
    this.subscriptionUser = this.store.select('auth').subscribe((authStore) => {
      const user = authStore?.auth;
      this.updateAuthState(!!user?.token);
    });
  }

  private updateAuthState(isAuthenticated: boolean) {
    this.authStateSubject.next(isAuthenticated);
  }

  login(email: string, password: string): Observable<IAuthResponse> {
    const result = new IAuthResponse();
    return this.http
      .post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        map((response) => {
          if (
            response?.data &&
            response.message_code === 'USER_AUTHENTICATED'
          ) {
            const user: IAuth = {
              email: response.data.email,
              name: response.data.name,
              role: response.data.role,
              status: response.data.status,
              token: response.data.token,
            };
            this.store.dispatch(new AuthActions.AuthenticateUser(user));
            this.storeJwtToken(user.token);
            this.toastService.showSuccess('Inicio de sesión exitoso', 'Éxito');
            this.updateAuthState(true);
            result.auth = user;
          } else {
            result.isError = true;
            this.toastService.showError(
              'Error en el inicio de sesión. Por favor, inténtelo de nuevo.'
            );
          }
          return result;
        }),
        catchError((error) => {
          result.isError = true;
          this.handleLoginError(error, result);
          return of(result);
        })
      );
  }

  autoLogin(): Observable<boolean> {
    const token = this.getStoredToken();
    if (!token) {
      return of(false);
    }
    return this.verifyToken(token).pipe(
      map((isValid) => (isValid ? true : (this.logout(), false))),
      catchError(() => (this.logout(), of(false)))
    );
  }

  private verifyToken(token: string): Observable<boolean> {
    return this.http
      .post<any>(
        `${this.apiUrl}/verify_auth`,
        {},
        {
          headers: { Authorization: token },
        }
      )
      .pipe(
        map((response) => !!response?.data),
        catchError(() => of(false))
      );
  }

  refreshToken() {
    const currentToken = this.getStoredToken();
    if (!currentToken) {
      this.logout();
      return throwError('No token found');
    }
    return this.http
      .post<any>(`${this.apiUrl}/refresh`, { token: currentToken })
      .pipe(
        tap((response) => {
          if (response?.data?.token) {
            const updatedUser = {
              ...this.isAuthenticated(),
              token: response.data.token,
            };
            this.store.dispatch(new AuthActions.AuthenticateUser(updatedUser));
            this.storeJwtToken(response.data.token);
            this.updateAuthState(true);
          } else {
            this.logout();
          }
        }),
        catchError((error) => {
          this.logout();
          return throwError(error);
        })
      );
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private getStoredToken(): string | null {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  isAuthenticated(): IAuth {
    let authState: IAuth | null = null;
    this.store.select('auth').subscribe((authStore) => {
      authState = authStore?.auth;
    });
    return authState || { email: '', token: '' };
  }

  isLoggedIn(): boolean {
    return !!this.getStoredToken();
  }

  getToken(): string {
    return this.isAuthenticated().token || this.getStoredToken() || '';
  }

  getUserName(): string {
    return this.isAuthenticated().name || '';
  }

  private handleLoginError(error: any, result: IAuthResponse) {
    if (error.status === 404) {
      this.toastService.showError('Endpoint no encontrado. Verifique la URL.');
    } else if (error.error?.message_code === 'INVALID_CREDENTIALS') {
      result.errorMessage =
        'El correo electrónico o la contraseña no son correctos.';
      this.toastService.showError(result.errorMessage);
    } else if (error.error?.message_code === 'USER_NOT_ACTIVE') {
      result.errorMessage = 'Debe activar su cuenta antes de iniciar sesión.';
      this.toastService.showWarning(result.errorMessage);
    } else {
      result.errorMessage = error_message_handler(error);
      this.toastService.showError(result.errorMessage);
    }
    this.store.dispatch(new AuthActions.LogoutUser());
  }

  checkAuthState(): Observable<void> {
    const token = localStorage.getItem(this.JWT_TOKEN);
    if (token) {
      return this.http
        .post<any>(
          `${this.apiUrl}/verify_auth`,
          {},
          {
            headers: { Authorization: token },
          }
        )
        .pipe(
          map((response) => {
            if (response?.data) {
              const updatedUser = {
                email: response.data.email,
                name: response.data.name,
                role: response.data.role,
                status: response.data.status,
                token: token,
              };
              this.store.dispatch(
                new AuthActions.AuthenticateUser(updatedUser)
              );
              this.updateAuthState(true);
            } else {
              this.updateAuthState(false);
              this.logout();
            }
          }),
          catchError((error) => {
            this.updateAuthState(false);
            this.logout();
            return of(undefined);
          })
        );
    } else {
      this.updateAuthState(false);
      return of(undefined);
    }
  }

  logout() {
    const authState = this.isAuthenticated();
    const userEmail = authState.email;

    if (!userEmail) {
      this.performLocalLogout();
      return;
    }

    this.http
      .put<any>(`${this.apiUrl}/logout`, { email: userEmail })
      .pipe(
        tap((response) => {
          if (response?.message_code === 'USER_LOGGED_OUT') {
          } else {
          }
        }),
        catchError((error) => {
          return throwError(error);
        })
      )
      .subscribe({
        complete: () => {
          this.performLocalLogout();
        },
      });
  }

  private performLocalLogout() {
    this.store.dispatch(new AuthActions.LogoutUser());
    localStorage.removeItem(this.JWT_TOKEN);
    this.router.navigate(['/login']);
  }
}
