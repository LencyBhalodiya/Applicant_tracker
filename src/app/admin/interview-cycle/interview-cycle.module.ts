import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterviewCycleRoutingModule } from './interview-cycle-routing.module';
import { InterviewCycleComponent } from './interview-cycle.component';
import { MaterialDesignModule } from 'src/app/shared/material-design/material-design.module';
import { AddRoundDialog } from './add-stage-round-dialog/addround-dialog';


@NgModule({
  declarations: [
    InterviewCycleComponent,
    AddRoundDialog
  ],
  imports: [
    CommonModule,
    InterviewCycleRoutingModule,
    MaterialDesignModule
  ]
})
export class InterviewCycleModule { }
