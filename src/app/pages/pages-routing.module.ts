import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'heroes', pathMatch: 'full' },
  { path: 'heroes', loadChildren: () => import('./heroes/heroes.module').then(m => m.HeroesModule) },
  { path: 'heroe/:id', loadChildren: () => import('./heroe/heroe.module').then(m => m.HeroeModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
