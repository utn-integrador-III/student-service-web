import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {
  private apiUrl = 'https://9gp4l168-5001.use.devtunnels.ms/zone';

  constructor(private http: HttpClient) {}

  getZonas(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }

  agregarZona(zona: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, zona);
  }

  eliminarZona(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  actualizarZona(zona: any): Observable<any> {
    return this.http.put<any>(this.apiUrl, zona);
  }
}
