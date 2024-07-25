import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ExampleComponent } from './components/example/example.component';
import { ModuleObjectsComponent } from './module-objects/module-objects.component';
import { LostAndFoundComponent } from './pages/lost-items/lost-and-found/lost-and-found.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { LoginComponent } from './login/login.component';
import { ZonasComponent } from './zonas/zonas.component';
import { TeacherLogComponent } from './pages/teacher-log/teacher-log.component';
import { StudentLogComponent } from './pages/student-log/student-log.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'example', component: ExampleComponent },
  { path: 'objects', component: ModuleObjectsComponent },
  { path: 'lostAndFound', component: LostAndFoundComponent },
  {
    path: 'teacherlog',
    component: TeacherLogComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'studentlog',
    component: StudentLogComponent,
    canActivate: [AuthGuard],
  },
  { path: 'zones', component: ZonasComponent, canActivate: [AuthGuard] },
  {
    path: 'categorias',
    component: CategoriasComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
