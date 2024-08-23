import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResetPasswordComponent } from './reset-password.component';
import { ResetPasswordRoutingModule } from '../../reset-password-routing.module';  // Importa el módulo de rutas

@NgModule({
  declarations: [
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ResetPasswordRoutingModule  // Agrega el módulo de rutas
  ]
})
export class ResetPasswordModule { }
