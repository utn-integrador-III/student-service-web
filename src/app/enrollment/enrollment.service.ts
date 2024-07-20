import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  private apiUrl = 'http://localhost:5002';

  constructor(private http: HttpClient) {}

  enroll(name: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/enrollment`, { name, email, password }).pipe(
      map(response => response),
      catchError(error => {
        throw error;
      })
    );
  }

  verify(email: string, code: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/verify`, { email, code }).pipe(
      map(response => response),
      catchError(error => {
        throw error;
      })
    );
  }
}
