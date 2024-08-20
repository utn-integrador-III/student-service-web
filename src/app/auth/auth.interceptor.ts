import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    if (!token) {
      console.warn(
        'No token found, request will proceed without Authorization header.'
      );
      return next.handle(req);
    }

    const authReq = req.clone({
      setHeaders: {
        Authorization: token,
      },
    });

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return from(this.authService.refreshToken()).pipe(
            switchMap(() => {
              const newToken = this.authService.getToken();
              const retryReq = req.clone({
                setHeaders: {
                  Authorization: newToken,
                },
              });
              return next.handle(retryReq);
            }),
            catchError((err) => throwError(err))
          );
        } else {
          return throwError(error);
        }
      })
    );
  }
}
