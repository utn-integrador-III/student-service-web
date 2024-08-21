import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
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
    private permissionService: PermissionService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.authService.getUserInfo().pipe(
      map(() => {
        const screenPath = `/${route.routeConfig?.path}`;

        // Permitir acceso a las pantallas de objetos perdidos para usuarios no autenticados
        if (this.permissionService.canAccessScreen(screenPath)) {
          return true;
        }

        // Redirigir a la página de inicio si el acceso no está permitido
        this.permissionService.redirectToHome();
        return false;
      })
    );
  }
}
