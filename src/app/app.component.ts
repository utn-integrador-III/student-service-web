import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as fromApp from './store/app.reducer';
import { AuthService } from './auth/auth.service';
import { IAuth } from './login/models/login.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  userAuthenticated: IAuth | null = null;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private store: Store<fromApp.AppState>,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.checkAuthState().subscribe({
      next: () => {
        this.subscriptions.add(
          this.store.select('auth').subscribe((authState) => {
            this.userAuthenticated = authState.auth;
            if (!this.userAuthenticated?.token) {
              this.router.navigate(['/login']);
            }
          })
        );
      },
      error: (error) => {
        this.router.navigate(['/login']);
      },
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.authService.logout();
  }
}
