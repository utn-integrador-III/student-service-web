import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SafekeeperService {
  private baseUrl =
    environment.URL_API_SAFEKEEPER !== ''
      ? environment.URL_API_SAFEKEEPER
      : '/api/safekeepers';

  constructor(private http: HttpClient) {}

  getAllSafekeepers(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  addSafekeeper(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data);
  }

  updateSafekeeper(id: string, safekeeper: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, safekeeper);
  }

  deleteSafekeeper(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
