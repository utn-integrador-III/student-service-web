import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';  // Ajusta la ruta según tu estructura de archivos

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private apiUrl = environment.URL_ENROLLMENT;
  private verifyUrl = environment.URL_VERIFY;

  constructor(private http: HttpClient) {}

  enrollUser(userData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, userData);
  }

  verifyCode(email: string, code: string): Observable<any> {
    return this.http.post<any>(this.verifyUrl, { email, code });
  }
}
