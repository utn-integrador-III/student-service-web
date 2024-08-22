import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { IAuth } from '../../../app/login/models/login.model';
import { ToastService } from '../../Services/toaster.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  // Definición de los permisos por rol
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
      '/classes': ['read', 'write', 'delete', 'update'],
    },
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  // Método para verificar si el usuario tiene acceso a una pantalla
  canAccessScreen(screenPath: string): boolean {
    const userInfo = localStorage.getItem('USER_INFO');
    if (userInfo) {
      const user: IAuth = JSON.parse(userInfo);
      return this.hasAccess(user, screenPath);
    } else {
      // User is not authenticated, redirect to the login page
      this.router.navigate(['/home']);
      return false;
    }
  }

  // Método para verificar si un usuario no autenticado puede acceder a una pantalla
  public canAccessAsUnauthenticated(screenPath: string): boolean {
    const unauthenticatedRoutes = ['/lostAndFound'];

    // Verificar si el usuario está autenticado
    const userInfo = this.authService.getCurrentUser();

    if (userInfo) {
      return false;
    }

    // Si el usuario no está autenticado, verificar si tiene acceso a la ruta
    if (unauthenticatedRoutes.includes(screenPath)) {
      return true;
    }
    this.toastService.showError('No tiene acceso');
    this.router.navigate(['/home']);
    return false;
  }

  // Método para verificar si un usuario tiene acceso a una pantalla
  private hasAccess(user: IAuth, screenPath: string): boolean {
    // Si el usuario es un administrador, tiene acceso a todo
    if (user.role?.name === 'Admin') {
      return true;
    }

    // Verificar si el usuario tiene los permisos necesarios para acceder a la pantalla
    if (user.role && this.rolePermissions[user.role.name]) {
      return this.hasPermission('read', screenPath);
    }

    // Si el usuario no tiene acceso, redirigir a la página de inicio
    this.router.navigate(['/home']);
    return false;
  }

  // Método para verificar si el usuario tiene un permiso específico en una pantalla
  hasPermission(permission: string, screenPath: string): boolean {
    const user = this.authService.getCurrentUser();
    if (!user || !user.role) {
      return false;
    }

    const rolePerms = this.rolePermissions[user.role.name];
    if (!rolePerms || !rolePerms[screenPath]) {
      return false;
    }
    return rolePerms[screenPath].includes(permission);
  }
  // Método para verificar si el usuario tiene un rol específico
  private hasRole(role: string): boolean {
    const user = this.authService.getCurrentUser();
    return user?.role?.name === role;
  }

  // Métodos para verificar permisos específicos
  canManageLostObjects(): boolean {
    const user = this.authService.getCurrentUser();
    return (
      this.hasRole('Admin') ||
      user?.role?.permissions.includes('lostobject_mngmt')
    );
  }

  canManageIssues(): boolean {
    const user = this.authService.getCurrentUser();
    return (
      this.hasRole('Admin') || user?.role?.permissions.includes('issue_mngmt')
    );
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

  // Métodos para verificar permisos específicos de lectura, escritura, eliminación y actualización
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
