import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EnrollmentService } from './enrollment.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', loadComponent: () => import('./enrollment/enrollment.component').then(m => m.EnrollmentComponent) }])
  ],
  providers: [EnrollmentService]
})
export class EnrollmentModule { }
