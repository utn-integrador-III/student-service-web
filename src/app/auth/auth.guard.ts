import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn()
      ? of(true)
      : this.authService.refreshToken().pipe(
          map(() => {
            if (this.authService.isLoggedIn()) {
              return true;
            } else {
              this.router.navigate(['/login']);
              return false;
            }
          }),
          catchError(() => {
            this.router.navigate(['/login']);
            return of(false);
          })
        );
  }
}
