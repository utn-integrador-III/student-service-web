import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReportIssueComponent } from './report-issue.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [ReportIssueComponent],

  imports: [
    MatTableModule,
    MatButtonModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    MatToolbarModule,
    HttpClientModule,
    BrowserModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
})
export class ReportIssueModule { }
