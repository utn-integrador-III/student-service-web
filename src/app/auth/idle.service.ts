import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IdleService {
  private timeoutId: any;
  private timeout = 15 * 60 * 1000;  // 15 minutes in milliseconds

  constructor(private authService: AuthService, private router: Router) {}

  startWatching() {
    console.log('listening events')
    window.addEventListener('mousemove', this.resetTimer.bind(this));
    window.addEventListener('keydown', this.resetTimer.bind(this));
    window.addEventListener('scroll', this.resetTimer.bind(this));
    this.setTimer();
  }

  resetTimer() {
    clearTimeout(this.timeoutId);
    this.setTimer();
  }

  private setTimer() {
    this.timeoutId = setTimeout(() => this.handleTimeout(), this.timeout);
  }

  private handleTimeout() {
    console.log('User has been idle for 15 minutes, logging out...');
    this.authService.logout(); // Implement logout in AuthService
    this.router.navigate(['/login']);
    this.stopWatching();  // Stop watching for activity
  }

  public stopWatching() {
    window.removeEventListener('mousemove', this.resetTimer.bind(this));
    window.removeEventListener('keydown', this.resetTimer.bind(this));
    clearTimeout(this.timeoutId);
  }
}
