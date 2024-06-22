import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.URL_AUTH !== "" ? environment.URL_AUTH : '/api/auth';
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      map(response => {
        if (response && response.data && response.message_code === 'USER_AUTHENTICATED') {
          localStorage.setItem('user', JSON.stringify(response.data));
          return true;
        }
        return false;
      }),
      catchError(error => {
        console.error('Login error', error);
        return of(false);
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }
}
