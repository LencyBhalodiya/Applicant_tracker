import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageApplicantRoutingModule } from './manage-applicant-routing.module';
import { ManageApplicantComponent } from './manage-applicant.component';


@NgModule({
  declarations: [
    ManageApplicantComponent
  ],
  imports: [
    CommonModule,
    ManageApplicantRoutingModule
  ]
})
export class ManageApplicantModule { }
