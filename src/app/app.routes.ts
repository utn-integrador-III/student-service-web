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
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'lostAndFound',
    component: LostAndFoundComponent,
    canActivate: [AuthGuard],
    data: {
      requiredPermissions: [
        { screen: '/lostAndFound', action: 'read' },
        { screen: '/lostAndFound', action: 'write' },
        { screen: '/lostAndFound', action: 'delete' },
        { screen: '/lostAndFound', action: 'update' },
      ],
    },
  },
  {
    path: 'teacherlog',
    component: TeacherLogComponent,
    canActivate: [AuthGuard],
    data: {
      requiredPermissions: [{ screen: '/teacherlog', action: 'read' }],
    },
  },
  {
    path: 'studentlog',
    component: StudentLogComponent,
    canActivate: [AuthGuard],
    data: {
      requiredPermissions: [{ screen: '/studentlog', action: 'read' }],
    },
  },
  {
    path: 'zones',
    component: ZonasComponent,
    canActivate: [AuthGuard],
    data: {
      requiredPermissions: [{ screen: '/zones', action: 'read' }],
    },
  },
  {
    path: 'categorias',
    component: CategoriasComponent,
    canActivate: [AuthGuard],
    data: {
      requiredPermissions: [{ screen: '/categorias', action: 'read' }],
    },
  },
  { path: 'enroll', component: EnrollmentComponent },
  { path: 'cambiocontraseña', component: ChangePasswordComponent },
  {
    path: 'reportIssues',
    component: ReportIssueComponent,
    canActivate: [AuthGuard],
    data: {
      requiredPermissions: [{ screen: '/reportIssues', action: 'create' }],
    },
  },
  {
    path: 'issues',
    component: VisualizationIssuesComponent,
    canActivate: [AuthGuard],
    data: {
      requiredPermissions: [{ screen: '/issues', action: 'read' }],
    },
  },
  {
    path: 'classes',
    component: PickClassesComponent,
    canActivate: [AuthGuard],
    data: {
      requiredPermissions: [{ screen: '/classes', action: 'read' }],
    },
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
