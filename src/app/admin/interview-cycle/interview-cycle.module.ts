import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterviewCycleRoutingModule } from './interview-cycle-routing.module';
import { InterviewCycleComponent } from './interview-cycle.component';


@NgModule({
  declarations: [
    InterviewCycleComponent
  ],
  imports: [
    CommonModule,
    InterviewCycleRoutingModule
  ]
})
export class InterviewCycleModule { }
