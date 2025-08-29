import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

interface ApiResponse {
  status: number;
  data: any;
  message?: string;
  message_code?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProfessorEmail {
  private URL_TEACHEREMAIL = environment.URL_API_TEACHEREMAIL;

  constructor(private http: HttpClient) {}

  getProfessorByEmail(email: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.URL_TEACHEREMAIL}/${email}`);
  }
}
