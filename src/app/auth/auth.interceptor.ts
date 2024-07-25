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
import { environment } from '../../environments/environment';

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
    const excludedUrls = [
      environment.URL_LOSTOBJECTSBYID,
      environment.URL_AUTH,
      environment.URL_LOSTANDFOUND,
    ];

    const shouldIncludeToken = !excludedUrls.some((url) =>
      req.url.startsWith(url)
    );

    console.log('Token:', token);
    console.log('Request URL:', req.url);
    console.log('Should include token:', shouldIncludeToken);

    let authReq = req;
    if (token && shouldIncludeToken) {
      console.log('Attaching token to request');
      authReq = req.clone({
        setHeaders: {
          Authorization: token,
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
