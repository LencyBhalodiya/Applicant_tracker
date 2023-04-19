import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterviewCycleRoutingModule } from './interview-cycle-routing.module';
import { InterviewCycleComponent } from './interview-cycle.component';
import { MaterialDesignModule } from 'src/app/shared/material-design/material-design.module';
import { AddRoundDialog } from './add-stage-round-dialog/addround-dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [InterviewCycleComponent, AddRoundDialog],
  imports: [
    CommonModule,
    InterviewCycleRoutingModule,
    MaterialDesignModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class InterviewCycleModule {}
