import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from 'src/app/applicant/profile/profile.component';
import { ManageApplicantComponent } from './manage-applicant.component';

const routes: Routes = [
  {path:'', component:ManageApplicantComponent},
  {
    path: 'profile/:id',
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageApplicantRoutingModule { }
