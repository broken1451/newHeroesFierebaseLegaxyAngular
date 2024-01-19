import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroesComponent } from './heroes.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    HeroesComponent
  ],
  imports: [
    CommonModule,
    HeroesRoutingModule,
    SharedModule
  ]
})
export class HeroesModule { }
