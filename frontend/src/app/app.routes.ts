// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './features/landing/landing.component';
import { PlanningComponent } from './features/planning/planning.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { UserDashboardComponent } from './features/dashboards/user-dashboard/user-dashboard.component';
import { OperatorDashboardComponent } from './features/dashboards/operator-dashboard/operator-dashboard.component';
import { AdminDashboardComponent } from './features/dashboards/admin-dashboard/admin-dashboard.component';


export const routes: Routes = [

  { path: '', component: LandingComponent },
  { path: 'planning',
    loadChildren: () => 
      import('./features/planning/planning.module').then((m) => m.PlanningModule)
  },
  { path: 'menu', 
    loadChildren: () => 
      import('./features/menu/menu.module').then((m) => m.MenuModule)}, // page de menu
  { path: 'register', loadChildren: () => import('./features/register/register.module').then(m => m.RegisterModule) }, // page d'inscription
  {
    path: 'user',
    component: UserDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['USER'] }
  },
  {
    path: 'operator',
    component: OperatorDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['OPERATOR'] }
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] }
  },
  { path: '**', redirectTo: '' } // redirection des routes non définies
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }]
})
export class AppRoutingModule { }