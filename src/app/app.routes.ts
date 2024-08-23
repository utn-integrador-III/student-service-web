import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
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
import { ResetPasswordComponent } from './reset-password/reset-password.component';

export const routes: Routes = [
  //Rutas que no requieren permisos
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'enroll', component: EnrollmentComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'cambiocontraseña', component: ChangePasswordComponent },

  //Rutas que requieren permisos
  {
    path: 'lostAndFound',
    component: LostAndFoundComponent,
    canActivate: [AuthGuard],
    data: {
      requiredPermissions: [
        { screen: '/lostAndFound', action: 'read' },
        { screen: '/lostAndFound', action: 'write' },
        { screen: '/lostAndFound', action: 'update' },
        { screen: '/lostAndFound', action: 'delete' },
        { screen: '/lostAndFound', action: 'lostobject_mngmt' },
        { screen: '/lostAndFound', action: 'issue_mngmt' },
      ],
    },
  },
  {
    path: 'teacherlog',
    component: TeacherLogComponent,
    canActivate: [AuthGuard],
    data: {
      requiredPermissions: [
        { screen: '/teacherlog', action: 'read' },
        { screen: '/teacherlog', action: 'write' },
        { screen: '/teacherlog', action: 'update' },
        { screen: '/teacherlog', action: 'delete' },
      ],
    },
  },
  {
    path: 'studentlog',
    component: StudentLogComponent,
    canActivate: [AuthGuard],
    data: {
      requiredPermissions: [
        { screen: '/studentlog', action: 'read' },
        { screen: '/studentlog', action: 'write' },
        { screen: '/studentlog', action: 'update' },
        { screen: '/studentlog', action: 'delete' },
      ],
    },
  },
  {
    path: 'zones',
    component: ZonasComponent,
    canActivate: [AuthGuard],
    data: {
      requiredPermissions: [
        { screen: '/zones', action: 'read' },
        { screen: '/zones', action: 'write' },
        { screen: '/zones', action: 'update' },
        { screen: '/zones', action: 'delete' },
      ],
    },
  },
  {
    path: 'categorias',
    component: CategoriasComponent,
    canActivate: [AuthGuard],
    data: {
      requiredPermissions: [
        { screen: '/categorias', action: 'read' },
        { screen: '/categorias', action: 'write' },
        { screen: '/categorias', action: 'update' },
        { screen: '/categorias', action: 'delete' },
      ],
    },
  },
  {
    path: 'reportIssues',
    component: ReportIssueComponent,
    canActivate: [AuthGuard],
    data: {
      requiredPermissions: [
        { screen: '/reportIssues', action: 'read' },
        { screen: '/reportIssues', action: 'write' },
        { screen: '/reportIssues', action: 'update' },
        { screen: '/reportIssues', action: 'delete' },
      ],
    },
  },
  {
    path: 'issues',
    component: VisualizationIssuesComponent,
    canActivate: [AuthGuard],
    data: {
      requiredPermissions: [
        { screen: '/issues', action: 'read' },
        { screen: '/issues', action: 'write' },
        { screen: '/issues', action: 'update' },
        { screen: '/issues', action: 'delete' },
      ],
    },
  },
  {
    path: 'classes',
    component: PickClassesComponent,
    canActivate: [AuthGuard],
    data: {
      requiredPermissions: [
        { screen: '/classes', action: 'read' },
        { screen: '/classes', action: 'write' },
        { screen: '/classes', action: 'update' },
        { screen: '/classes', action: 'delete' },
      ],
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
