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
import { map, catchError, tap, take } from 'rxjs/operators';
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
    this.subscriptionUser?.unsubscribe();
  }

  private initAuthListener() {
    this.subscriptionUser = this.store.select('auth').subscribe((authStore) => {
      const user = authStore?.auth;
      this.updateAuthState(!!user?.token);
    });
  }

  private updateAuthState(isAuthenticated: boolean) {
    this.authStateSubject.next(isAuthenticated);
  }

  login(email: string, password: string): Observable<IAuthResponse> {
    return this.http
      .post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        map((response) => {
          const result = new IAuthResponse();
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
          const result = new IAuthResponse();
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
    return this.verifyToken().pipe(
      map((isValid) => {
        if (isValid) {
          return true;
        } else {
          this.logout();
          return false;
        }
      }),
      catchError(() => {
        this.logout();
        return of(false);
      })
    );
  }

  refreshToken(): Observable<any> {
    const currentToken = this.getStoredToken();
    if (!currentToken) {
      this.logout();
      return throwError(() => new Error('No token found'));
    }
    return this.http
      .post<any>(`${this.apiUrl}/refresh`, { token: currentToken })
      .pipe(
        tap((response) => {
          if (response?.data?.token) {
            const updatedUser = {
              ...this.getCurrentUser(),
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
          return throwError(() => error);
        })
      );
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private getStoredToken(): string | null {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  getCurrentUser(): IAuth | null {
    let authState: IAuth | null = null;
    this.store
      .select('auth')
      .pipe(take(1))
      .subscribe((authStore) => {
        authState = authStore?.auth;
      });
    return authState;
  }

  isLoggedIn(): Observable<boolean> {
    return of(!!this.getStoredToken());
  }

  getToken(): string {
    return this.getCurrentUser().token || this.getStoredToken() || '';
  }

  getUserName(): string {
    return this.getCurrentUser().name || '';
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

  private verifyToken(): Observable<boolean> {
    const token = this.getStoredToken();
    return this.http
      .post<any>(
        `${this.apiUrl}/verify_auth`,
        {},
        { headers: { Authorization: token || '' } }
      )
      .pipe(
        map((response) => !!response?.data),
        catchError(() => of(false))
      );
  }

  checkAuthState(): Observable<void> {
    const token = this.getStoredToken();

    if (token) {
      return this.http
        .post<any>(
          `${this.apiUrl}/verify_auth`,
          { permission: '' },
          { headers: { Authorization: token } }
        )
        .pipe(
          map((response) => {
            if (response?.data) {
              const updatedUser: IAuth = {
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
          catchError(() => {
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
    const userEmail = this.getCurrentUser().email;

    if (!userEmail) {
      this.performLocalLogout();
      return;
    }

    this.http
      .put<any>(`${this.apiUrl}/logout`, { email: userEmail })
      .pipe(catchError((error) => throwError(() => error)))
      .subscribe({
        complete: () => this.performLocalLogout(),
      });
  }

  private performLocalLogout() {
    this.store.dispatch(new AuthActions.LogoutUser());
    localStorage.removeItem(this.JWT_TOKEN);
    this.router.navigate(['/login']);
  }

  resetPassword(email: string): Observable<any> {
    const url = `${this.apiUrl}/password/reset`;
    return this.http.post(url, { email }).pipe(
      tap(() => {
        this.toastService.showSuccess(
          'Correo de restablecimiento de contraseña enviado.'
        );
      }),
      catchError((error) => {
        this.toastService.showError(
          'Error al enviar el correo de restablecimiento de contraseña.'
        );
        return throwError(() => error);
      })
    );
  }

  getUserInfo(): Observable<IAuth> {
    return of(this.getCurrentUser());
  }

  hasScreenAccess(screen: string): boolean {
    return this.getCurrentUser()?.role?.screens?.includes(screen) || false;
  }

  hasPermission(permission: string): boolean {
    return (
      this.getCurrentUser()?.role?.permissions?.includes(permission) || false
    );
  }

  initAuthState(): Observable<boolean> {
    const token = this.getStoredToken();
    if (!token) {
      return of(false);
    }
    return this.verifyToken().pipe(
      map((isValid) => {
        if (isValid) {
          const currentUser = this.getCurrentUser();
          if (currentUser && currentUser.token) {
            this.store.dispatch(new AuthActions.AuthenticateUser(currentUser));
            this.updateAuthState(true);
            return true;
          } else {
            console.error('Usuario actual no válido');
            this.logout();
            return false;
          }
        } else {
          this.logout();
          return false;
        }
      }),
      catchError(() => {
        this.logout();
        return of(false);
      })
    );
  }
}
