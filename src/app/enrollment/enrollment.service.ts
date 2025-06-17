import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private apiUrl = environment.URL_API_ENROLLMENT;
  private verifyUrl = environment.URL_API_VERIFY;

  constructor(private http: HttpClient) {}

  enrollUser(userData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, userData).pipe(
      catchError(this.handleError)
    );
  }

  verifyCode(email: string, code: number): Observable<any> {
    return this.http.put<any>(this.verifyUrl, { 'user_email': email, 'verification_code': code }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';

    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Backend error
      if (error.status === 401) {  // Unauthorized, typically used for invalid or expired codes
        const serverError = error.error;

        if (serverError.message_code === 'VERIFICATION_EXPIRED') {
          errorMessage = 'El código de verificación ha expirado. Por favor, solicita uno nuevo.';
        } else if (serverError.message_code === 'INVALID_VERIFICATION_CODE') {
          errorMessage = 'El código de verificación es incorrecto. Por favor, verifica el código e inténtalo de nuevo.';
        } else {
          errorMessage = `Error: ${serverError.message}`;
        }
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    }

    return throwError(() => new Error(errorMessage));
  }
}
