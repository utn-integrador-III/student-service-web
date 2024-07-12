import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode } from '@angular/core';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { ExampleComponent } from './components/example/example.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ToastService } from './services/toaster.service';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { ModuleObjectsComponent } from './module-objects/module-objects.component';
import { appReducer } from './store/app.reducer';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';

import { MatInputModule } from '@angular/material/input';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { LostAndFoundComponent } from './pages/lost-items/lost-and-found/lost-and-found.component';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './login/login.component';
import { ZonasComponent } from './zonas/zonas.component';
import { ModalAgregarZonaComponent } from './modal-agregar-zona/modal-agregar-zona.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CategoriasComponent } from './categorias/categorias.component';
import { CategoriasModalComponent } from './categorias-modal/categorias-modal.component';
import { TeacherLogComponent } from './pages/teacher-log/teacher-log.component';
import { StudentLogComponent } from './pages/student-log/student-log.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExampleComponent,
    ModuleObjectsComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    LostAndFoundComponent,
    LoginComponent,
    TeacherLogComponent,
    ModalAgregarZonaComponent,
    ZonasComponent,
    StudentLogComponent,
    CategoriasComponent,
    CategoriasModalComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    MatIconModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducer),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 100,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      closeButton: true,
      progressBar: true,
    }),
    MatSidenavModule,
    MatCardModule,
    MatListModule,
    MatPaginatorModule,
    FormsModule,
    MatDialogModule,
    MatToolbarModule,
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],

  providers: [
    provideAnimationsAsync(),
    provideAnimations(),
    provideToastr(),
    ToastService,
    provideHttpClient(),
    provideAnimationsAsync(),
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
