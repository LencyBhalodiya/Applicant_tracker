import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileEditComponent } from './applicant/profile-edit/profile-edit.component';
import { UserDashboardComponent } from './applicant/user-dashboard/user-dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { CustomRolesComponent } from './admin/custom-roles/custom-roles.component';
import { InterviewCycleComponent } from './admin/interview-cycle/interview-cycle.component';
import { ReportsComponent } from './admin/reports/reports.component';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { ManageApplicantComponent } from './admin/manage-applicant/manage-applicant.component';
import { ManageStreamsComponent } from './admin/manage-streams/manage-streams.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'applicant',
    component: UserDashboardComponent,
  },
  {
    path: 'applicant/edit',
    component: ProfileEditComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        component: AdminDashboardComponent,
      },
      {
        path: 'manage-user',
        component: ManageUsersComponent,
      },
      {
        path: 'manage-applicant',
        component: ManageApplicantComponent,
      },
      {
        path: 'custom-roles',
        component: CustomRolesComponent,
      },
      {
        path: 'interview-cycle',
        component: InterviewCycleComponent,
      },
      {
        path: 'manage-stream',
        component: ManageStreamsComponent,
      },
      {
        path: 'reports',
        component: ReportsComponent,
      },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
