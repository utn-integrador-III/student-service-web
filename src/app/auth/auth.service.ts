import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subscription, throwError } from 'rxjs';
import { map, catchError, tap, finalize } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import * as AuthActions from '../login/store/login.action';
import { IAuthResponse } from '../login/models/login.interface';
import { IAuth } from '../login/models/login.model';
import { ToastService } from '../Services/toaster.service';
import { Router } from '@angular/router';
import { error_message_handler } from '../shared/helper/error-message.handler';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private subscriptionUser: Subscription = new Subscription();
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private readonly USER_DATA = 'USER_DATA';
  private readonly SESSION_CLOSED_FLAG = 'SESSION_CLOSED';
  private userAuthenticate: IAuth | null = null;
  private apiUrl = environment.URL_AUTH;
  private refreshTokenUrl = environment.URL_REFRESH;
  private logoutUrl = environment.URL_LOGOUT;

  constructor(
    private http: HttpClient,
    private toastService: ToastService,
    private router: Router,
    private store: Store<any>
  ) {
    this.initializeAuthentication();
    this.addBeforeUnloadListener();
  }

  ngOnDestroy() {
    this.subscriptionUser.unsubscribe();
    this.removeBeforeUnloadListener();
  }

  private addBeforeUnloadListener() {
    window.addEventListener('beforeunload', this.handleBeforeUnload.bind(this));
  }

  private removeBeforeUnloadListener() {
    window.removeEventListener(
      'beforeunload',
      this.handleBeforeUnload.bind(this)
    );
  }

  private handleBeforeUnload(event: BeforeUnloadEvent) {
    // Solo cerrar sesión si la bandera está establecida
    if (sessionStorage.getItem(this.SESSION_CLOSED_FLAG) === 'true') {
      // Borrar los tokens del almacenamiento local
      this.clearLocalStorage();

      // Intentar cerrar la sesión de manera asíncrona
      const token = this.getToken();
      if (token && this.userAuthenticate?.email) {
        const data = new FormData();
        data.append('email', this.userAuthenticate.email);

        // Enviar el logout de manera asíncrona usando sendBeacon
        navigator.sendBeacon(this.logoutUrl, data);
      }
    }
  }

  private shouldClearLocalStorage(): boolean {
    return sessionStorage.getItem(this.SESSION_CLOSED_FLAG) === 'true';
  }

  private clearSessionFlags() {
    sessionStorage.removeItem(this.SESSION_CLOSED_FLAG);
  }

  private setSessionClosedFlag() {
    sessionStorage.setItem(this.SESSION_CLOSED_FLAG, 'true');
  }

  getToken(): string {
    return localStorage.getItem(this.JWT_TOKEN) || '';
  }

  getRefreshToken(): string {
    return localStorage.getItem(this.REFRESH_TOKEN) || '';
  }

  private storeTokens(token: string, refreshToken: string) {
    localStorage.setItem(this.JWT_TOKEN, token);
    localStorage.setItem(this.REFRESH_TOKEN, refreshToken);
  }

  private storeUserData(user: IAuth) {
    localStorage.setItem(this.USER_DATA, JSON.stringify(user));
  }

  login(email: string, password: string): Observable<IAuthResponse> {
    return this.http.post<any>(this.apiUrl, { email, password }).pipe(
      map((response) => {
        const result = new IAuthResponse();
        if (
          response &&
          response.data &&
          response.message_code === 'USER_AUTHENTICATED'
        ) {
          const user: IAuth = {
            email: response.data.email,
            name: response.data.name,
            role: response.data.role,
            status: response.data.status,
            token: response.data.token,
          };
          this.handleAuthentication(user, response.data.refreshToken);
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
        console.error('Login error:', error);
        const result = new IAuthResponse();
        result.isError = true;
        result.errorMessage = error_message_handler(error);
        this.toastService.showError(result.errorMessage);
        return of(result);
      })
    );
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available.'));
    }

    return this.http
      .post<any>(`${this.refreshTokenUrl}`, { token: refreshToken })
      .pipe(
        tap((response: any) => {
          if (response && response.data && response.data.token) {
            const updatedUser = {
              ...this.userAuthenticate!,
              token: response.data.token,
            };
            this.handleAuthentication(updatedUser, response.data.refreshToken);
          } else {
            throw new Error('Invalid response structure for token refresh');
          }
        }),
        catchError((error) => {
          console.error('Token refresh error:', error);
          this.logout();
          return throwError(() => error);
        })
      );
  }

  private initializeAuthentication() {
    // Limpiar la bandera de sesión cerrada al inicializar
    this.clearSessionFlags();

    const userData = localStorage.getItem(this.USER_DATA);
    const token = this.getToken();
    if (userData && token) {
      const user: IAuth = JSON.parse(userData);
      user.token = token;
      this.store.dispatch(new AuthActions.AuthenticateUser(user));
      this.refreshToken().subscribe();
    }
    this.subscribeToAuthStore();
  }

  logout() {
    const token = this.getToken();
    if (token) {
      this.http
        .put(this.logoutUrl, { email: this.userAuthenticate?.email })
        .pipe(
          finalize(() => {
            this.clearLocalStorage();
            this.store.dispatch(new AuthActions.LogoutUser());
            this.router.navigate(['/login']);
          })
        )
        .subscribe(
          () =>
            this.toastService.showSuccess(
              'Sesión cerrada exitosamente',
              'Éxito'
            ),
          (error) => {
            console.error('Logout error:', error);
            this.toastService.showError('Error al cerrar sesión');
          }
        );
    } else {
      this.clearLocalStorage();
      this.store.dispatch(new AuthActions.LogoutUser());
      this.router.navigate(['/login']);
    }
  }

  private clearLocalStorage() {
    console.log('Clearing local storage');
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
    localStorage.removeItem(this.USER_DATA);
  }

  isAuthenticated(): boolean {
    return !!this.userAuthenticate?.token;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private handleAuthentication(user: IAuth, refreshToken: string) {
    this.store.dispatch(new AuthActions.AuthenticateUser(user));
    this.storeTokens(user.token, refreshToken);
    this.storeUserData(user);
  }

  private subscribeToAuthStore() {
    this.subscriptionUser = this.store.select('auth').subscribe((authStore) => {
      this.userAuthenticate = authStore?.auth || null;
    });
  }

  getUserName() {
    return this.userAuthenticate?.name || '';
  }
}
