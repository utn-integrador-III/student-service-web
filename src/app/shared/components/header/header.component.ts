import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as fromApp from '../../../store/app.reducer';
import { IAuth } from '../../../login/models/login.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { ProfessorEmail } from '../../../Services/professorByEmail/professorByEmail.service';
import { PermissionService } from '../../../Services/permission/permission.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userAuthenticated: IAuth | null = null;
  menuOpen: boolean = false;
  welcomeMessage: string = '';
  showIssues = false;
  showStudentLog = false;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private permissionService: PermissionService,
    private store: Store<fromApp.AppState>,
    private router: Router,
    private authService: AuthService,
    private professorEmail: ProfessorEmail
  ) {
    this.showIssues = this.permissionService.canAccessScreen('/reportIssues');
    this.showStudentLog = this.permissionService.canAccessScreen('/studentlog');
  }

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
        this.router.navigate(['/login']);
      },
    });
  }

  private updateWelcomeMessage() {
    const domain = '@utn.ac.cr';
    if (this.userAuthenticated && this.userAuthenticated.name) {
      this.welcomeMessage = `Bienvenid@ ${this.userAuthenticated.name}`;
    } else {
      this.welcomeMessage = 'Bienvenid@ Invitado';
    }
    if (this.userAuthenticated.email.endsWith(domain)) {
      this.infoInformacionByEmail(this.userAuthenticated.email);
    }
  }

  infoInformacionByEmail(email: string): void {
    this.professorEmail.getProfessorByEmail(email).subscribe((response) => {
      if (response && response.data) {
        this.userAuthenticated = {
          ...this.userAuthenticated,
        };
      }
    });
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
