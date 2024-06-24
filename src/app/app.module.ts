import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routes'
import { AppComponent } from './app.component';
//import { HttpClientModule } from '@angular/common/http';
//import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { appReducer} from './store/app.reducer';

import { HomeComponent } from './home/home.component';
import { ModuleObjectsComponent } from './module-objects/module-objects.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// import { ObjectPropertyModule } from './Product/product.module';
// import { LoginModule } from './login/login.module';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CategoriasComponent } from './categorias/categorias.component';
import { CategoriasModalComponent } from './categorias-modal/categorias-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';



@NgModule({  
  declarations: [
    AppComponent
    , HomeComponent
    ,ModuleObjectsComponent,
    CategoriasComponent,
    CategoriasModalComponent
  ],
  imports: [
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    BrowserModule,    
    //HttpClientModule,
    //ObjectPropertyModule,
    AppRoutingModule,
    //LoginModule,
    StoreModule.forRoot(appReducer)
  ],
  providers: [
    provideHttpClient(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }