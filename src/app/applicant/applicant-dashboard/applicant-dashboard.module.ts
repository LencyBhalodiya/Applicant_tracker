import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicantDashboardRoutingModule } from './applicant-dashboard-routing.module';
import { ApplicantDashboardComponent } from './applicant-dashboard.component';
import { MaterialDesignModule } from 'src/app/shared/material-design/material-design.module';


@NgModule({
  declarations: [
    ApplicantDashboardComponent,
  ],
  imports: [
    CommonModule,
    ApplicantDashboardRoutingModule,
    MaterialDesignModule
  ]
})
export class ApplicantDashboardModule { }
