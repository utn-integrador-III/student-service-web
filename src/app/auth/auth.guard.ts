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
        if (!user) {
          this.router.navigate(['/home']);
          return false;
        }

        const screenPath = `/${route.routeConfig?.path}`;
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
