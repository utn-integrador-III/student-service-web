import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from './auth/auth.service';
import { of, Subscription } from 'rxjs';
import { exhaustMap, filter } from 'rxjs/operators';
import * as fromApp from './store/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  userName: string = '';
  isAuth: boolean = false;
  pageTitle: any;
  routerSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>, private router: Router, private authService: AuthService,) {}

  ngOnInit() {
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      exhaustMap(event => {
        if (this.authService.isAuthenticated()) {
          return this.authService.refreshToken();
        }
        return of(null);
      })
    ).subscribe({
      next: (response) => {
        if (response && response.isError) {
          console.error('Token refresh failed', response.isError);
          this.authService.logout();
        }
      },
      error: (err) => {
        console.error('Navigation or refresh token error', err);
        // Optionally handle network errors differently
      }
    });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

}
