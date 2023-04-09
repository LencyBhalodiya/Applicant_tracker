import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageApplicantRoutingModule } from './manage-applicant-routing.module';
import { ManageApplicantComponent } from './manage-applicant.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { InterviewScheduleComponent } from './interview-schedule/interview-schedule.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialDesignModule } from 'src/app/shared/material-design/material-design.module';


@NgModule({
  declarations: [
    ManageApplicantComponent,
    FeedbackComponent,
    SearchBarComponent,
    InterviewScheduleComponent,
  ],
  imports: [
    CommonModule,
    ManageApplicantRoutingModule,
    ReactiveFormsModule,
    MaterialDesignModule
  ]
})
export class ManageApplicantModule { }
