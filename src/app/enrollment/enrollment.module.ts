import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EnrollmentComponent } from './enrollment.component'; // Asegúrate de que esta ruta es correcta
import { EnrollmentService } from './enrollment.service';
import { EnrollmentRoutingModule } from './enrollment-routing.module';

@NgModule({
  declarations: [EnrollmentComponent],
  imports: [
    CommonModule,
    FormsModule,
    EnrollmentRoutingModule
  ],
  providers: [EnrollmentService]
})
export class EnrollmentModule { }
