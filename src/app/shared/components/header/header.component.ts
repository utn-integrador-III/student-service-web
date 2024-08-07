import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import * as AuthActions from '../../../login/store/login.action';
import { IAuth } from '../../../login/models/login.model';
import { ToastService } from '../../../Services/toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userAuthenticated: IAuth;
  menuOpen: boolean = false;
  welcomeMessage: string;

  constructor(
    private store: Store<fromApp.AppState>,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    this.store.select('auth').subscribe((authState) => {
      this.userAuthenticated = authState.auth;
      this.welcomeMessage = `Bienvenid@ ${this.userAuthenticated?.name}`;
    });
  }

  logout() {
    this.store.dispatch(new AuthActions.LogoutUser());
    this.toastService.showSuccess('Se cerró sesión exitosamente', 'Éxito');
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

  closeMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
