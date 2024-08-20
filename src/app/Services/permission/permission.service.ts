import { Injectable } from '@angular/core';
import { AuthService } from '../../../app/auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  constructor(private authService: AuthService, private router: Router) {}

  canAccessScreen(screenPath: string): boolean {
    const user = this.authService.getCurrentUser();
    if (user && user.role && user.role.screens) {
      return user.role.screens.includes(screenPath);
    }
    return false;
  }

  canViewLostObjects(): boolean {
    return true; // Siempre permitido
  }

  canManageLostObjects(): boolean {
    return this.authService.hasPermission('lostobject_mngmt');
  }

  redirectToHome() {
    this.router.navigate(['/home']);
  }

  hasPermission(permission: string): boolean {
    return this.authService.hasPermission(permission);
  }

  canManageIssues(): boolean {
    return this.hasPermission('issue_mngmt');
  }
}
