import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from 'src/app/applicant/profile/profile.component';
import { FutureReferenceComponent } from './future-reference.component';

const routes: Routes = [
  {
    path: '',
    component: FutureReferenceComponent,
  }
  ,
  {
    path: 'profile/:id',
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FutureReferenceRoutingModule { }
