import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './store/app.reducer';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component'; 
import { AuthService } from './auth/auth.service'; 
import { AuthGuard } from './auth/auth.guard'; 

@NgModule({  
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent 
  ],
  imports: [
    BrowserModule,    
    HttpClientModule, 
    FormsModule, 
    AppRoutingModule,
    StoreModule.forRoot(appReducer)
  ],
  providers: [AuthService, AuthGuard], 
  bootstrap: [AppComponent]
})
export class AppModule { }
