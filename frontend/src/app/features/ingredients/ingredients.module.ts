import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { IngredientsRoutingModule } from './ingredients-routing.module';
import { IngredientsComponent }     from './ingredients.component';

@NgModule({
  declarations: [
    IngredientsComponent
  ],
  imports: [
    CommonModule,             
    FormsModule,              
    IngredientsRoutingModule 
  ]
})
export class IngredientsModule {}
