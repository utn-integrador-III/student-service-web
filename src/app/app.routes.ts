import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LostItemsComponent } from './pages/lost-items/lost-items.component';
import { LostAndFoundComponent } from './pages/lost-items/lost-and-found/lost-and-found.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'lostAndFound',
    component: LostAndFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
