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
}
