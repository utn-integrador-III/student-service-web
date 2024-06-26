import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
//import { ProductDetailGuard } from './Product/product-detail/product-detail.guard';
//import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {path:'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }