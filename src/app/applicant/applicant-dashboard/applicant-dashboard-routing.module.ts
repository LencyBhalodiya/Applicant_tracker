import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicantDashboardComponent } from './applicant-dashboard.component';

const routes: Routes = [
  { path: '', component: ApplicantDashboardComponent },
  {
    path: 'profile',
    loadChildren: () =>
      import('../profile/profile.module').then((m) => m.ProfileModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicantDashboardRoutingModule {}
