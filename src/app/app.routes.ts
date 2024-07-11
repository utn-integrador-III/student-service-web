import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ExampleComponent } from './components/example/example.component';
import { ModuleObjectsComponent } from './module-objects/module-objects.component';
import { LostAndFoundComponent } from './pages/lost-items/lost-and-found/lost-and-found.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { LoginComponent } from './login/login.component';
import { ZonasComponent } from './zonas/zonas.component';
import { TeacherLogComponent } from './pages/teacher-log/teacher-log.component';
import { StudentLogComponent } from './pages/student-log/student-log.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'example', component: ExampleComponent },
  { path: 'objects', component: ModuleObjectsComponent },
  { path: 'lostAndFound', component: LostAndFoundComponent },
  { path: 'teacherlog', component: TeacherLogComponent },
  { path: 'studentlog', component: StudentLogComponent },
  { path: 'zones', component: ZonasComponent },
  { path: 'categorias', component: CategoriasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
