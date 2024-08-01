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
import { ToastService } from '../Services/toaster.service';

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

    console.log('Token from auth.interceptor:', token);
    console.log('Request URL:', req.url);
    let authReq = req;
    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: token, // Include token directly
        },
      });
    } else {
      console.log('No token available');
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