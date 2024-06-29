import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ExampleComponent } from './components/example/example.component';
import { ModuleObjectsComponent } from './module-objects/module-objects.component';
import { LostAndFoundComponent } from './pages/lost-items/lost-and-found/lost-and-found.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },  // Ruta para el login

  { path: 'home', component: HomeComponent },
  { path: 'example', component: ExampleComponent },
  { path: 'objects', component: ModuleObjectsComponent },
  { path: 'lostAndFound', component: LostAndFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
