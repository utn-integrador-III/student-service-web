import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './store/app.reducer';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ZonasComponent } from './zonas/zonas.component';
import { ModalAgregarZonaComponent } from './modal-agregar-zona/modal-agregar-zona.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ZonasComponent,
    ModalAgregarZonaComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducer),
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
