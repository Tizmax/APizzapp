// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './features/landing/landing.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
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
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }]
})
export class AppRoutingModule { }