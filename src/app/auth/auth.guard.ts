import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { IdleService } from './idle.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private idleService: IdleService , private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated() && this.authService.isLoggedIn()) {
      this.idleService.startWatching();
      return true;
    } 
    else {
      this.idleService.stopWatching();
      this.router.navigate(['/login']).then(() => {
        window.location.reload();
      });
      return false;
    }
  }
}