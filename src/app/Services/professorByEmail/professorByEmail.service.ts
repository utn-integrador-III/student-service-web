import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfessorEmail {
  private URL_TEACHEREMAIL = environment.URL_API_TEACHEREMAIL;

  constructor(private http: HttpClient) {}

  getProfessorByEmail(email: string): Observable<any> {
    const params = new HttpParams().set('professor_email', email);
    return this.http.get<any>(this.URL_TEACHEREMAIL, { params });
  }
}
