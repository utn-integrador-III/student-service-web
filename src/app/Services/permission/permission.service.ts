import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { IAuth } from '../../../app/login/models/login.model';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  constructor(private authService: AuthService, private router: Router) {}

  canAccessScreen(screenPath: string): boolean {
    const user = this.authService.getCurrentUser();
    console.log('PermissionService: Current User:', user);
    console.log('PermissionService: Screen Path:', screenPath);

    if (!user) {
      // Si no hay un usuario autenticado, comprueba si la ruta solicitada es la ruta de objetos perdidos
      if (screenPath === '/lostAndFound') {
        console.log(
          'PermissionService: Unauthenticated user accessing /lostAndFound'
        );
        return true;
      } else {
        console.log('PermissionService: Access denied for:', screenPath);
        this.redirectToHome();
        return false;
      }
    }

    if (user.role && user.role.screens) {
      const hasAccess = user.role.screens.includes(screenPath);
      console.log('PermissionService: Authenticated user access:', hasAccess);
      return hasAccess;
    } else {
      console.log('PermissionService: Access denied for:', screenPath);
      this.redirectToHome();
      return false;
    }
  }

  private hasAccess(user: IAuth, screenPath: string): boolean {
    if (user.role && user.role.screens) {
      const hasAccess = user.role.screens.includes(screenPath);
      console.log('PermissionService: Authenticated user access:', hasAccess);
      return hasAccess;
    } else {
      console.log('PermissionService: Access denied for:', screenPath);
      this.redirectToHome();
      return false;
    }
  }

  redirectToHome() {
    console.log('PermissionService: Redirecting to home.');
    this.router.navigate(['/home']);
  }

  hasPermission(permission: string): boolean {
    const user = this.authService.getCurrentUser();
    return user?.role?.permissions?.includes(permission);
  }

  canManageLostObjects(): boolean {
    return this.hasPermission('lostobject_mngmt');
  }

  canManageIssues(): boolean {
    return this.hasPermission('issue_mngmt');
  }
}
