import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LabManaging {
  private URL_API_LABMANAGING = environment.URL_API_LABMANAGING;

  constructor(private http: HttpClient) {}

  getObjects(): Observable<any[]> {
    return this.http.get<any[]>(this.URL_API_LABMANAGING);
  }

  addObjects(object: any): Observable<any> {
    return this.http.post<any>(this.URL_API_LABMANAGING, object);
  }

  deleteObjects(id: string): Observable<any> {
    return this.http.delete<any>(`${this.URL_API_LABMANAGING}/${id}`);
  }

  updateObjects(object: any): Observable<any> {
    return this.http.put<any>(this.URL_API_LABMANAGING, object);
  }
}
