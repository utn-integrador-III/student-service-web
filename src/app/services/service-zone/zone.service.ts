import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {
  private ZoneUrl = (environment.URL_ZONE !== "") ? environment.URL_ZONE : 'api/zone';

  constructor(private http: HttpClient) {}

  getZonas(): Observable<any[]> {
    return this.http.get<any>(this.ZoneUrl).pipe(
      map(response => response.data)
    );
  }

  agregarZona(zona: any): Observable<any> {
    return this.http.post<any>(this.ZoneUrl, zona);
  }

  eliminarZona(id: string): Observable<any> {
    return this.http.delete<any>(`${this.ZoneUrl}/${id}`);
  }

  actualizarZona(zona: any): Observable<any> {
    return this.http.put<any>(this.ZoneUrl, zona);
  }
}
