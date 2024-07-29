import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfessorManaging {
  private URL_API_PROFESSOR = environment.URL_API_PROFESSOR;

  constructor(private http: HttpClient) {}

  getProffesors(): Observable<any[]> {
    return this.http.get<any[]>(this.URL_API_PROFESSOR);
  }

  addProffesors(object: any): Observable<any> {
    return this.http.post<any>(this.URL_API_PROFESSOR, object);
  }

  deleteProffesors(id: string): Observable<any> {
    return this.http.delete<any>(`${this.URL_API_PROFESSOR}/${id}`);
  }

  updateProffesors(object: any): Observable<any> {
    return this.http.put<any>(this.URL_API_PROFESSOR, object);
  }

  getCoursesByProfessor(professorId: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.URL_API_PROFESSOR}/${professorId}/courses`
    );
  }
}
