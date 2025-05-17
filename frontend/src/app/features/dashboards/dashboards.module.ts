import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardsRoutingModule } from './dashboards-routing.module';
import { UserDashboardComponent }     from './user-dashboard/user-dashboard.component';
import { OperatorDashboardComponent } from './operator-dashboard/operator-dashboard.component';
import { AdminDashboardComponent }    from './admin-dashboard/admin-dashboard.component';

@NgModule({
  declarations: [
    UserDashboardComponent,
    OperatorDashboardComponent,
    AdminDashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardsRoutingModule
  ]
})
export class DashboardsModule { } 
