import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterviewCycleRoutingModule } from './interview-cycle-routing.module';
import { InterviewCycleComponent } from './interview-cycle.component';
import { MaterialDesignModule } from 'src/app/shared/material-design/material-design.module';
import { AddStageDialog } from './add-stage-dialog/addstage-dialog';
import { AddRoundDialog } from './add-round-dialog/addround-dialog';
import { EditStageDialog } from './edit-stage-dialog/editstage-dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    InterviewCycleComponent,
    AddRoundDialog,
    AddStageDialog,
    EditStageDialog,
  ],
  imports: [
    CommonModule,
    InterviewCycleRoutingModule,
    MaterialDesignModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class InterviewCycleModule {}
