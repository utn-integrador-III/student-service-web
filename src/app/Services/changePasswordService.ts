import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ChangePassword } from '../interfaces/changePasswordInterface';

@Injectable({
  providedIn: 'root',
})
export class ChangePasswordService {
  private apiUrl = `${environment.URL_CHANGE_PASSOWORD}`;

  constructor(private http: HttpClient) {}

  changePassword(data: ChangePassword): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}`, data);
  }
}
