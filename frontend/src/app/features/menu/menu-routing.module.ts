import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { DetailProduitComponent } from './detail-produit/detail-produit.component';
import { RecapCommandeComponent } from './recap-commande/recap-commande.component';

const routes: Routes = [{ path: '', component: MenuComponent },
  { path: 'detail-produit/:id1', component: DetailProduitComponent },
  { path: 'detail-produit/:id1/:id2', component: DetailProduitComponent },
  { path: 'recap-commande', component: RecapCommandeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
