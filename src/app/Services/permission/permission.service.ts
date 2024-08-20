import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

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

  redirectToHome() {
    this.router.navigate(['/home']);
  }

  hasPermission(permission: string): boolean {
    return this.authService.hasPermission(permission);
  }

  canManageLostObjects(): boolean {
    return this.hasPermission('lostobject_mngmt');
  }

  canManageIssues(): boolean {
    return this.hasPermission('issue_mngmt');
  }
}
