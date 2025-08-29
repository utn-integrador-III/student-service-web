import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ToastrModule, provideToastr } from 'ngx-toastr';
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
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select'; // ⬅️ Nuevo: Importa MatSelectModule

import { VisualizationIssuesComponent } from './visualization-issues.component';
import { VisualizationIssueDialogComponent } from './dialog/visualization-issue-dialog.component';

@NgModule({
  declarations: [
    VisualizationIssuesComponent,
    VisualizationIssueDialogComponent,
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSidenavModule,
    MatCardModule,
    MatListModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatSelectModule, // ⬅️ Nuevo: Añade MatSelectModule al arreglo de imports
    ToastrModule.forRoot({
      timeOut: 100,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      closeButton: true,
      progressBar: true,
    }),
  ],
})
export class VisualizationIssuesModule {}
