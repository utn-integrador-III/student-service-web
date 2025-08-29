import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Ajusta la ruta si es diferente

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
    private apiUrl = environment.URL_API_PASSWORD_RESET;

  constructor(private http: HttpClient) { }

  resetPassword(data: { email: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
