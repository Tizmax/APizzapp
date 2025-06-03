// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './features/landing/landing.component';
import { AuthGuard } from './guards/auth.guard';



export const routes: Routes = [

  { path: '', component: LandingComponent, canActivate: [AuthGuard] },
  {
    path: 'planning',
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN', 'OPERATOR'] },
    loadChildren: () =>
      import('./features/planning/planning.module')
        .then(m => m.PlanningModule)
  },
   {
    path: 'ingredients',
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN', 'OPERATOR'] },
    loadChildren: () =>
      import('./features/ingredients/ingredients.module')
        .then(m => m.IngredientsModule)
  },
  {
    path: 'comptabilite',
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] },
    loadChildren: () =>
      import('./features/comptabilite/comptabilite.module')
        .then(m => m.ComptabiliteModule)
  },
  { path: 'menu', 
    loadChildren: () => 
      import('./features/menu/menu.module').then((m) => m.MenuModule)}, // page de menu
  { path: 'register', loadChildren: () => import('./features/register/register.module').then(m => m.RegisterModule) }, // page d'inscription
  {
    path: 'dashboards',
    loadChildren: () =>
      import('./features/dashboards/dashboards.module')
        .then(m => m.DashboardsModule)
  },
  { path: '**', redirectTo: '' } // redirection des routes non définies
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
})
export class AppRoutingModule { }