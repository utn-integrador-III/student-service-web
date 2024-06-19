import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routes'
import { AppComponent } from './app.component';
//import { HttpClientModule } from '@angular/common/http';
//import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { appReducer} from './store/app.reducer';

import { HomeComponent } from './home/home.component';
// import { ObjectPropertyModule } from './Product/product.module';
// import { LoginModule } from './login/login.module';

@NgModule({  
  declarations: [
    AppComponent
    , HomeComponent
  ],
  imports: [
    BrowserModule,    
    //HttpClientModule,
    //ObjectPropertyModule,
    AppRoutingModule,
    //LoginModule,
    StoreModule.forRoot(appReducer)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }