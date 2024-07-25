import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { AppModule } from '../app.module';
import { AppRoutingModule } from '../app.routes';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [HomeComponent],

  imports: [AppRoutingModule, CommonModule],
})
export class homeModule {}
