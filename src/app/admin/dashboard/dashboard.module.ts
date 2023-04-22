import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AdminChartsComponent } from './admin-charts/admin-charts.component';
import { MaterialDesignModule } from 'src/app/shared/material-design/material-design.module';


@NgModule({
  declarations: [
    DashboardComponent,
    AdminChartsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialDesignModule
  ]
})
export class DashboardModule { }
