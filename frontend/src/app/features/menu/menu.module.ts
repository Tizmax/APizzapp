import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';

import { MenuComponent } from './menu/menu.component';
import { DetailProduitComponent } from './detail-produit/detail-produit.component';


@NgModule({
  declarations: [
    MenuComponent,
    DetailProduitComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule
  ]
})
export class MenuModule { }
