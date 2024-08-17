import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ExampleComponent } from './components/example/example.component';
import { LostAndFoundComponent } from './pages/lost-items/lost-and-found/lost-and-found.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { LoginComponent } from './login/login.component';
import { ZonasComponent } from './zonas/zonas.component';
import { TeacherLogComponent } from './pages/teacher-log/teacher-log.component';
import { StudentLogComponent } from './pages/student-log/student-log.component';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { AuthGuard } from './auth/auth.guard';
import { ReportIssueComponent } from './pages/report-issues/report-issue/report-issue.component';
import { VisualizationIssuesComponent } from './pages/visualization-issues/visualization-issues.component';
import { PickClassesComponent } from './pages/pick-classes/pick-classes.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'example', component: ExampleComponent },
  { path: 'lostAndFound', component: LostAndFoundComponent },
  { path: 'teacherlog', component: TeacherLogComponent },
  { path: 'studentlog', component: StudentLogComponent },
  { path: 'zones', component: ZonasComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'enroll', component: EnrollmentComponent },
  {path: 'cambiocontraseña', component: ChangePasswordComponent},

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
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'reportIssues', component: ReportIssueComponent },
  { path: 'issues', component: VisualizationIssuesComponent },
  { path: 'classes', component: PickClassesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
