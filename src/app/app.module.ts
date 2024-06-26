import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { ExampleComponent } from './components/example/example.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ToastService } from './services/toaster.service';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { ModuleObjectsComponent } from './module-objects/module-objects.component';
// import { ObjectPropertyModule } from './Product/product.module';
// import { LoginModule } from './login/login.module';

import { appReducer } from './store/app.reducer';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
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
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    CommonModule,
    AppRoutingModule,
    //LoginModule,
    StoreModule.forRoot(appReducer),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      closeButton: true,
      progressBar: true,
    }),
  ],

  providers: [
    provideAnimationsAsync(),
    provideAnimations(),
    provideToastr(),
    ToastService,
  ],

  bootstrap: [AppComponent],
  //StoreModule.forRoot(appReducer),

  // providers: [],
  // bootstrap: [AppComponent],
})
export class AppModule {}
