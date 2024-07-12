import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
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

  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  ngOnInit(): void {}

  logOut(): void {
    this.userName = '';
    this.isAuth = false;
  }
}
