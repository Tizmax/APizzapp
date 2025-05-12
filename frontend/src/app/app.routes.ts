// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './features/landing/landing.component';
import { DetailProduitComponent } from './features/detail-produit/detail-produit.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'menu',   
    loadChildren: () => 
      import('./features/menu/menu.module').then((m) => m.MenuModule) }, // page d'accueil
  { path: 'detail-produit/:id', component: DetailProduitComponent },
  { path: 'register', loadChildren: () => import('./features/register/register.module').then(m => m.RegisterModule) }, // page d'inscription
  { path: '**', redirectTo: '' } // redirection des routes non définies
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
