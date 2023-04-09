import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterviewCycleComponent } from './interview-cycle.component';

const routes: Routes = [{ path: '', component: InterviewCycleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterviewCycleRoutingModule { }
