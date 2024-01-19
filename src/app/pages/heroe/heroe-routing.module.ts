import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroeComponent } from './heroe.component';

const routes: Routes = [
  {
    path: '', component: HeroeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroeRoutingModule { }
