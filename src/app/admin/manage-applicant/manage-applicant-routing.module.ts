import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageApplicantComponent } from './manage-applicant.component';

const routes: Routes = [
  {path:'', component:ManageApplicantComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageApplicantRoutingModule { }
