import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
//import { HttpClientModule } from '@angular/common/http';
//import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './store/app.reducer';
import { HomeComponent } from './home/home.component';
import { ZonasComponent } from './zonas/zonas.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalAgregarZonaComponent } from './modal-agregar-zona/modal-agregar-zona.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { ObjectPropertyModule } from './Product/product.module';
// import { LoginModule } from './login/login.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ZonasComponent,
    ModalAgregarZonaComponent,
  ],
  imports: [
    BrowserModule,
    NgbModalModule,
    FormsModule,
    //HttpClientModule,
    //ObjectPropertyModule,
    AppRoutingModule,
    CommonModule,
    //LoginModule,
    StoreModule.forRoot(appReducer),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
