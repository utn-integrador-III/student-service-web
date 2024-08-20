import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
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
    return this.authService.getUserInfo().pipe(
      map((user) => {
        const screenPath = `/${route.routeConfig?.path}`;
        console.log('AuthGuard: User Info:', user);
        console.log('AuthGuard: Screen Path:', screenPath);

        // Permitir acceso a las pantallas de objetos perdidos para usuarios no autenticados
        if (this.permissionService.canAccessScreen(screenPath)) {
          console.log('AuthGuard: Access granted to:', screenPath);
          return true;
        }

        console.log('AuthGuard: Access denied, redirecting to home.');
        // Redirigir a la página de inicio si el acceso no está permitido
        this.permissionService.redirectToHome();
        return false;
      })
    );
  }
}
