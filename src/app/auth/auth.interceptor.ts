import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ToastService } from '../services/toaster.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    let authReq = req;
    if (token) {
      console.log('Attaching token to request');
      authReq = req.clone({
        setHeaders: {
          Authorization: token, // Include token directly
        },
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.toastService.showError(
            'No estás autenticado. Por favor, inicia sesión nuevamente.'
          );
        }
        return throwError(error);
      })
    );
  }
}
