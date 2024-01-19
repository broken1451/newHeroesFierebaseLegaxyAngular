import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroeRoutingModule } from './heroe-routing.module';
import { HeroeComponent } from './heroe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HeroeComponent
  ],
  imports: [
    CommonModule,
    HeroeRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class HeroeModule { }
