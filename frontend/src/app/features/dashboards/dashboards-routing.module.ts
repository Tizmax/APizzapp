import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard }            from '../../guards/auth.guard';
import { UserDashboardComponent }     from './user-dashboard/user-dashboard.component';
import { OperatorDashboardComponent } from './operator-dashboard/operator-dashboard.component';
import { AdminDashboardComponent }    from './admin-dashboard/admin-dashboard.component';
import { IngredientsComponent }       from './operator/ingredients/ingredients.component';

const routes: Routes = [
  {
    path: '',
    children: [
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
        path: 'operator/ingredients',
        component: IngredientsComponent,
        canActivate: [AuthGuard],
        data: { roles: ['OPERATOR', 'ADMIN'] }
      },
      {
        path: 'admin',
        component: AdminDashboardComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN'] }
      },
      { path: '', redirectTo: 'user', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardsRoutingModule { }
