import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  login(username: string, password: string): Observable<boolean> {
    // Datos de prueba
    const validUsername = 'wicuberona@est.utn.ac.cr';
    const validPassword = '12345';

    if (username === validUsername && password === validPassword) {
      localStorage.setItem('token', 'test-token');
      return of(true);
    }

    return of(false);
  }

  logout() {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
