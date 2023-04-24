import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCheckGuard } from 'src/app/shared/auth/auth-services/user-check.guard';
import { RegisterationComponent } from '../registeration/registeration.component';
import { ApplicantDashboardComponent } from './applicant-dashboard.component';

const routes: Routes = [
  { path: '', component: ApplicantDashboardComponent },
  {
    path: 'profile',
    canLoad: [UserCheckGuard],
    loadChildren: () =>
      import('../profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'register',
    component: RegisterationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicantDashboardRoutingModule {}
