import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { PermissionService } from '../Services/permission/permission.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private permissionService: PermissionService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const screenPath = `/${route.routeConfig?.path}`;

    // Permitir acceso a la página de objetos perdidos sin autenticación
    if (screenPath === '/lostAndFound') {
      return of(true);
    }

    return this.authService.getUserInfo().pipe(
      map((user) => {
        if (!user) {
          this.router.navigate(['/login']);
          return false;
        }

        if (this.permissionService.canAccessScreen(screenPath)) {
          return true;
        } else {
          this.permissionService.redirectToHome();
          return false;
        }
      })
    );
  }
}
