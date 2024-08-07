import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode } from '@angular/core';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { ExampleComponent } from './components/example/example.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastService } from './Services/toaster.service';
import { provideToastr } from 'ngx-toastr';
import { MenuComponent } from './shared/components/menu/menu.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginModule } from './login/login.module';
import { AgregarZonaModule } from './modal-agregar-zona/modal-agregar-zona.module';
import { categoriasModalModule } from './categorias-modal/categorias-modal.module';
import { ZoneModule } from './zonas/zonas.module';
import { CategoriesModule } from './categorias/categorias.module';
import { LostAndFoundModule } from './pages/lost-items/lost-and-found/lost-and-found.module';
import { studentLogModule } from './pages/student-log/student-log.module';
import { homeModule } from './home/home.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
<<<<<<< HEAD
import { EnrollmentModule } from './enrollment/enrollment.module';
=======
import { AuthInterceptor } from './auth/auth.interceptor';
import { appReducer } from './store/app.reducer';
import { CommonModule } from '@angular/common';
import { TeacherLogModule } from './pages/teacher-log/teacher-log.module';
import { PickClassesModule } from './pages/pick-classes/pick-classes.module';
import { ReportIssueModule } from './pages/report-issues/report-issue/report-issue.module';
import { VisualizationIssuesModule } from './pages/visualization-issues/visualization-issues.module';
>>>>>>> 5c486d6a180ca5ef456d79bc2afbcc601c35c8c1

@NgModule({
  declarations: [
    AppComponent,
    ExampleComponent,
    FooterComponent,
    HeaderComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducer),
    LoginModule,
    AgregarZonaModule,
    categoriasModalModule,
    ZoneModule,
    TeacherLogModule,
    CategoriesModule,
    LostAndFoundModule,
    studentLogModule,
    homeModule,
    ReportIssueModule,
    PickClassesModule,
    VisualizationIssuesModule,
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
<<<<<<< HEAD
    EnrollmentModule
=======
    CommonModule,
>>>>>>> 5c486d6a180ca5ef456d79bc2afbcc601c35c8c1
  ],
  providers: [
    provideToastr(),
    provideHttpClient(),
    ToastService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
