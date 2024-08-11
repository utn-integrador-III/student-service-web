import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromApp from '../../../store/app.reducer';
import { IAuth } from '../../../login/models/login.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service'; // Asegúrate de tener el path correcto

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userAuthenticated: IAuth | null = null;
  menuOpen: boolean = false;
  welcomeMessage: string = '';
  private authSubscription: Subscription = new Subscription();

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private authService: AuthService // Inyectar el servicio de autenticación
  ) {}

  ngOnInit() {
    this.authSubscription = this.store.select('auth').subscribe((authState) => {
      this.userAuthenticated = authState.auth;
      this.welcomeMessage = `Bienvenid@ ${
        this.userAuthenticated?.name || 'Invitado'
      }`;
    });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  logout() {
    this.authService.logout(); // Llamar al método logout del AuthService
  }

  closeMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
