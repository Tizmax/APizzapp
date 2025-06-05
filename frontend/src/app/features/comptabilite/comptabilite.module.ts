import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComptabiliteComponent } from './comptabilite.component';
import { ComptabiliteRoutingModule } from './comptabilite-routing.module';

@NgModule({
  declarations: [
    ComptabiliteComponent 
  ],
  imports: [
    CommonModule,
    ComptabiliteRoutingModule
  ]
})
export class ComptabiliteModule { }
