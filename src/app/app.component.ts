import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducer';

@Component({
  selector: 'app-root',
  //standalone: true,
  //imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit { 
  userName: string ='';
  isAuth: boolean = false;

  constructor(private store: Store<fromApp.AppState>, private router: Router){

  }

  ngOnInit(): void {
    
  }

  logOut(): void  {
    this.userName="";
    this.isAuth=false;
    //this.store.dispatch(new LoginActios.LogoutUser());
    //this.router.navigate(['/login']);
  }
}
