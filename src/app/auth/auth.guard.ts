import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { PermissionService } from '../Services/permission/permission.service';
import { Router } from '@angular/router';

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

    // Check if the route is allowed for unauthenticated users
    if (this.permissionService.canAccessAsUnauthenticated(screenPath)) {
      return of(true);
    }

    return this.authService.getUserInfo().pipe(
      map((user) => {
        // Check if the user is authenticated and can access the screen
        const canAccess = this.permissionService.canAccessScreen(screenPath);

        if (canAccess) {
          return true;
        }

        // If the user cannot access, redirect to the home page
        this.router.navigate(['/home']);
        return false;
      })
    );
  }
}
