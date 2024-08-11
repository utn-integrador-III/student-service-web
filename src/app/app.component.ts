import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { of, Subscription } from 'rxjs';
import { exhaustMap, filter, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  userName: string = '';
  isAuth: boolean = false;
  pageTitle: any;
  private routerSubscription: Subscription;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.routerSubscription = this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        exhaustMap(() => {
          if (this.authService.isAuthenticated()) {
            return this.authService.refreshToken().pipe(
              catchError((error) => {
                console.error('Error refreshing token:', error);
                this.authService.logout();
                return of(null);
              })
            );
          }
          return of(null);
        })
      )
      .subscribe({
        next: (response) => {
          if (response && response.isError) {
            console.error('Token refresh failed:', response.isError);
            this.authService.logout();
            this.router.navigate(['/login']);
          } else {
            this.isAuth = this.authService.isAuthenticated();
            this.userName = this.authService.getUserName();
            this.pageTitle = this.router.url.replace('/', '');
            if (this.pageTitle === '') {
              this.pageTitle = 'Home';
            }
          }
        },
        error: (err) => {
          console.error('Error during navigation or token refresh:', err);
          this.authService.logout();
          this.router.navigate(['/login']);
        },
      });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
