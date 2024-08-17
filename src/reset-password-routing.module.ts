import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetPasswordComponent } from './app/reset-password/reset-password.component';

const routes: Routes = [
  { path: '', component: ResetPasswordComponent }  // Configura la ruta para el componente
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResetPasswordRoutingModule { }
