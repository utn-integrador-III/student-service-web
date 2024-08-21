import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { IAuth } from '../../../app/login/models/login.model';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private rolePermissions = {
    Admin: {
      '/lostAndFound': ['read', 'write', 'delete', 'update'],
      '/teacherlog': ['read', 'write', 'delete', 'update'],
      '/studentlog': ['read', 'write', 'delete', 'update'],
      '/zones': ['read', 'write', 'delete', 'update'],
      '/categorias': ['read', 'write', 'delete', 'update'],
      '/reportIssues': ['read', 'write', 'delete', 'update'],
      '/issues': ['read', 'write', 'delete', 'update'],
      '/classes': ['read', 'write', 'delete', 'update'],
    },
    BookinComputer: {
      '/teacherlog': ['read', 'write', 'delete', 'update'],
      '/reportIssues': ['read', 'write', 'delete', 'update'],
      '/issues': ['read', 'write', 'delete', 'update'],
      '/classes': ['read', 'write', 'delete', 'update'],
    },
    'Lost-Property/Member': {
      '/lostAndFound': ['read'],
      '/studentlog': ['read', 'write', 'update', 'delete'],
    },
  };

  constructor(private authService: AuthService, private router: Router) {}

  canAccessScreen(screenPath: string): boolean {
    const user = this.authService.getCurrentUser();

    if (!user) {
      return this.canAccessAsUnauthenticated(screenPath);
    }

    return this.hasAccess(user, screenPath);
  }

  private canAccessAsUnauthenticated(screenPath: string): boolean {
    const unauthenticatedRoutes = ['/lostAndFound'];
    if (unauthenticatedRoutes.includes(screenPath)) {
      return true;
    }
    this.redirectToLogin();
    return false;
  }

  private hasAccess(user: IAuth, screenPath: string): boolean {
    if (user.role?.name === 'Admin') {
      return true; // Admin tiene acceso total
    }

    if (user.role && this.rolePermissions[user.role.name]) {
      return !!this.rolePermissions[user.role.name][screenPath];
    }

    this.redirectToHome();
    return false;
  }

  redirectToHome() {
    this.router.navigate(['/home']);
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  hasPermission(permission: string, screenPath: string): boolean {
    const user = this.authService.getCurrentUser();
    if (!user || !user.role) return false;

    const rolePerms = this.rolePermissions[user.role.name];
    return (
      rolePerms &&
      rolePerms[screenPath] &&
      rolePerms[screenPath].includes(permission)
    );
  }

  private hasRole(role: string): boolean {
    const user = this.authService.getCurrentUser();
    return user?.role?.name === role;
  }

  canManageLostObjects(): boolean {
    return this.hasRole('Admin') || this.hasRole('Lost-Property/Member');
  }

  canManageIssues(): boolean {
    return this.hasRole('Admin') || this.hasRole('BookinComputer');
  }

  canAccessAdvancedSettings(): boolean {
    return this.hasRole('Admin');
  }

  canViewReports(): boolean {
    return this.hasRole('Admin') || this.hasRole('BookinComputer');
  }

  canPerformAllActions(): boolean {
    return this.hasRole('Admin');
  }

  canReadWriteDeleteUpdate(screenPath: string): boolean {
    const user = this.authService.getCurrentUser();
    if (!user || !user.role) return false;

    const rolePerms = this.rolePermissions[user.role.name];
    if (!rolePerms || !rolePerms[screenPath]) return false;

    const perms = rolePerms[screenPath];
    return (
      perms.includes('read') &&
      perms.includes('write') &&
      perms.includes('delete') &&
      perms.includes('update')
    );
  }

  canReadOnly(screenPath: string): boolean {
    const user = this.authService.getCurrentUser();
    if (!user || !user.role) return false;

    const rolePerms = this.rolePermissions[user.role.name];
    if (!rolePerms || !rolePerms[screenPath]) return false;

    return (
      rolePerms[screenPath].length === 1 &&
      rolePerms[screenPath].includes('read')
    );
  }
}
