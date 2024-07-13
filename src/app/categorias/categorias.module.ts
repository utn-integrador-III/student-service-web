import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CategoriasComponent } from './categorias.component';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule, provideAnimations} from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
@NgModule({
  declarations: [
    CategoriasComponent
  ],
  imports: [
    ToastrModule.forRoot({
        timeOut: 100,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
        closeButton: true,
        progressBar: true,
      }),
      MatTableModule,
      MatFormFieldModule,
      MatInputModule,
      BrowserAnimationsModule,
      BrowserModule,
      MatIconModule,
      MatTableModule,
      CommonModule,
      MatCardModule,
      MatSidenavModule,
      MatCardModule,
      MatListModule,
      MatPaginatorModule,
      FormsModule,
      MatDialogModule,
      MatToolbarModule,

  ],
  providers: [provideToastr()]
})
export class CategoriesModule { }