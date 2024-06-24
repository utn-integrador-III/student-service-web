import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routes'
import { AppComponent } from './app.component';
//import { HttpClientModule } from '@angular/common/http';
//import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { appReducer} from './store/app.reducer';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { ExampleComponent } from './components/example/example.component';
import { HomeComponent } from './home/home.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ToastService } from './services/toaster.service';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { ModuleObjectsComponent } from './module-objects/module-objects.component';
// import { ObjectPropertyModule } from './Product/product.module';
// import { LoginModule } from './login/login.module';

@NgModule({  
  declarations: [
    AppComponent
    , HomeComponent
    , ExampleComponent

    ,ModuleObjectsComponent
  ],
  imports: [
    BrowserModule,    
    //HttpClientModule,
    //ObjectPropertyModule,
    AppRoutingModule,
    //LoginModule,
    StoreModule.forRoot(appReducer),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000, 
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      closeButton: true,
      progressBar: true
    }),
  ],
  
  providers: [
    provideAnimationsAsync(),
    provideAnimations(),
    provideToastr(),
    ToastService
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }