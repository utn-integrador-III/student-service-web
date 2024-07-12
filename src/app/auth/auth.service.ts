import { Injectable } from '@angular/core';
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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  subscriptionUser: Subscription = null;
  userAuthenticate: IAuth;
  apiUrl = environment.URL_AUTH !== '' ? environment.URL_AUTH : '/api/auth';

  constructor(
    private store: Store<fromApp.AppState>,
    private http: HttpClient
  ) {
    this.getAuthentication();
  }

  login(email: string, password: string): Observable<IAuthResponse> {
    let result = new IAuthResponse();
    return this.http.post<any>(this.apiUrl, { email, password }).pipe(
      map((response) => {
        if (response && response.data && response.message_code === 'USER_AUTHENTICATED') {
          let user: IAuth = {
            email: response.data.email,
            name: response.data.name,
            role_id: response.data.role_id,
            status: response.data.status,
            token: response.data.token
          };
          this.store.dispatch(new AuthActions.AuthenticateUser(user));
          result.auth = user;
        } else {
          result.isError = true;
        }
        return result;
      }),
      catchError((error: any) => {
        console.log('error: ', error);
        result.isError = true;
        if (error.error && error.error.message_code === 'INVALID_CREDENTIALS') {
          result.errorMessage = 'El correo electrónico o la contraseña no son correctos.';
        } else if (error.error && error.error.message_code === 'USER_NOT_ACTIVE') {
          result.errorMessage = 'Debe activar su cuenta antes de iniciar sesión.';
        } else {
          result.errorMessage = error_message_handler(error);
        }
        this.store.dispatch(new AuthActions.LogoutUser());
        return of(result);
      })
    );
  }

  getAuthentication() {
    this.subscriptionUser = this.store.select('auth').subscribe(authStore => {
      this.userAuthenticate = authStore?.auth; 
    });
  }
}
