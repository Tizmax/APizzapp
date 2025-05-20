import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { MenuComponent } from './menu/menu.component';
import { DetailProduitComponent } from './detail-produit/detail-produit.component';
import { RecapCommandeComponent } from './recap-commande/recap-commande.component';


@NgModule({
  declarations: [
    MenuComponent,
    DetailProduitComponent,
    RecapCommandeComponent
    
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    ReactiveFormsModule
  ]
})
export class MenuModule { }
