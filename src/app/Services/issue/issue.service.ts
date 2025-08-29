import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

interface ApiResponse {
  status: number;
  data: any;
  message?: string;
  message_code?: string;
}

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  private URL_ISSUE = `${environment.URL_API_REPORT}/issue`;
  private URL_ISSUE_MNGMT = `${environment.URL_API_REPORT}/issue/mngmt`;

  constructor(private http: HttpClient) {}

  // Obtener todos los issues
  getIssues(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.URL_ISSUE);
  }

  // Crear un nuevo issue
  addIssue(issueData: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.URL_ISSUE, issueData);
  }

  // Actualizar un issue existente
  updateIssue(id: string, issueData: any): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.URL_ISSUE, {
      _id: id,
      ...issueData,
    });
  }

  // **Eliminar un issue**
  deleteIssue(issueId: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete(`${this.URL_ISSUE}/${issueId}`, { headers });
  }

  // Actualizar estado o comentario de un issue
  updateIssueStatusOrComment(
    issueId: string,
    updateData: { status?: string; new_update?: string; computer?: any[] }
  ): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.URL_ISSUE_MNGMT, {
      _id: issueId,
      ...updateData,
    });
  }
}
