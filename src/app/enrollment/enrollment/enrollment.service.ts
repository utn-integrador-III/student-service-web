// enrollment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private apiUrl = 'http://localhost:5002/auth/enrollment';  // Ajusta la URL a la ruta correcta
  private verifyUrl = 'http://localhost:5002/auth/verify';   // Ajusta la URL a la ruta correcta

  constructor(private http: HttpClient) {}

  enrollUser(userData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, userData);
  }

  verifyCode(code: string): Observable<any> {
    return this.http.post<any>(this.verifyUrl, { code });
  }
}
