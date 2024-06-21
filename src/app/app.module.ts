import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
//import { HttpClientModule } from '@angular/common/http';
//import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './store/app.reducer';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';

import { HomeComponent } from './home/home.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { LostAndFoundComponent } from './pages/lost-items/lost-and-found/lost-and-found.component';
// import { ObjectPropertyModule } from './Product/product.module';
// import { LoginModule } from './login/login.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    LostAndFoundComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    //HttpClientModule,
    //ObjectPropertyModule,
    AppRoutingModule,
    //LoginModule,
    StoreModule.forRoot(appReducer),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
