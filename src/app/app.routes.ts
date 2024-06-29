import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ZonasComponent } from './zonas/zonas.component';
import { ModuleObjectsComponent } from './module-objects/module-objects.component';
import { LostAndFoundComponent } from './pages/lost-items/lost-and-found/lost-and-found.component';
import { CategoriasComponent } from './categorias/categorias.component';

export const routes: Routes = [
    {path:'home', component: HomeComponent},
    {path:'zones', component: ZonasComponent },
    {path:'objects', component: ModuleObjectsComponent},
    {path:'lostAndFound', component: LostAndFoundComponent },
    {path: 'categorias', component: CategoriasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
