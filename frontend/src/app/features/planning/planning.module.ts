import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanningRoutingModule } from './planning-routing.module';
import { PlanningComponent } from './planning.component'; 

@NgModule({
  declarations: [PlanningComponent], 
  imports: [
    CommonModule,
    PlanningRoutingModule,
  ],
  exports: [PlanningComponent] 
})
export class PlanningModule {}
