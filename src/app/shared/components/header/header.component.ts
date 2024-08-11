import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as fromApp from '../../../store/app.reducer';
import { IAuth } from '../../../login/models/login.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userAuthenticated: IAuth | null = null;
  menuOpen: boolean = false;
  welcomeMessage: string = '';
  private subscriptions: Subscription = new Subscription();

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.store.select('auth').subscribe((authState) => {
        this.userAuthenticated = authState.auth;
        this.updateWelcomeMessage();
      })
    );

    this.authService.checkAuthState().subscribe({
      next: () => {},
      error: (error) => {
        console.error('Error al verificar el estado de autenticación:', error);
        this.router.navigate(['/login']);
      },
    });
  }

  private updateWelcomeMessage() {
    if (this.userAuthenticated && this.userAuthenticated.name) {
      this.welcomeMessage = `Bienvenid@ ${this.userAuthenticated.name}`;
    } else {
      this.welcomeMessage = 'Bienvenid@ Invitado';
    }
    console.log('Welcome Message:', this.welcomeMessage);
    console.log('User Authenticated:', this.userAuthenticated);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }

  closeMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
