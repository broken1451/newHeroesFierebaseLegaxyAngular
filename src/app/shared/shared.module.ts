import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { LoadingComponent } from './loading/loading.component';
import { NotFoundHeroesComponent } from './not-found-heroes/not-found-heroes.component';


@NgModule({
  declarations: [
    NavbarComponent,
    LoadingComponent,
    NotFoundHeroesComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [
    NavbarComponent,
    LoadingComponent,
    NotFoundHeroesComponent
  ]
})
export class SharedModule { }
