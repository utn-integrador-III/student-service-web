// lost-and-found.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LostAndFoundService {
  private URL_LOSTANDFOUND = environment.URL_LOSTANDFOUND;
  private URL_LOSTOBJECTSBYID = environment.URL_LOSTOBJECTSBYID;

  constructor(private http: HttpClient) {}

  getObjects(): Observable<any[]> {
    return this.http.get<any[]>(this.URL_LOSTANDFOUND);
  }

  addObjects(object: any): Observable<any> {
    return this.http.post<any>(this.URL_LOSTANDFOUND, object);
  }

  deleteObjects(id: string): Observable<any> {
    return this.http.delete<any>(`${this.URL_LOSTOBJECTSBYID}/${id}`);
  }

  updateObjects(object: any): Observable<any> {
    return this.http.put<any>(this.URL_LOSTANDFOUND, object);
  }
}
