import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageApplicantRoutingModule } from './manage-applicant-routing.module';
import { ManageApplicantComponent } from './manage-applicant.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialDesignModule } from 'src/app/shared/material-design/material-design.module';
import { PromoteComponent } from './promote/promote.component';
import { ColorPipe } from './services/color.pipe';
import { NgxPaginationModule } from 'ngx-pagination';




@NgModule({
  declarations: [
    ManageApplicantComponent,
    FeedbackComponent,
    SearchBarComponent,
    PromoteComponent,
    ColorPipe
  ],
  imports: [
    CommonModule,
    ManageApplicantRoutingModule,
    ReactiveFormsModule,
    MaterialDesignModule,
    NgxPaginationModule
  ],
  exports:[SearchBarComponent]
})
export class ManageApplicantModule { }
