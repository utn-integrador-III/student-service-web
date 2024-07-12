import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../interfaces/categoriasInterface';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriaServices {
  private baseUrl =
    environment.URL_API_CATEGORY !== ''
      ? environment.URL_API_CATEGORY
      : '/api/category';

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  addCategory(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data);
  }

  actualizarCategoria(id: string, categoria: Category): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}/${id}`, categoria);
  }

  deleteCategoria(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
