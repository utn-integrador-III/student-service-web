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
import { HttpClientModule } from '@angular/common/http';
import { ModuleObjectsComponent } from './module-objects/module-objects.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ModuleObjectsComponent,
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
    HttpClientModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
