import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './shared/auth/auth.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { NavbarsComponent } from './shared/navbars/navbars.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'applicant',
    loadChildren: () =>
      import('./applicant/applicant-dashboard/applicant-dashboard.module').then(
        (m) => m.ApplicantDashboardModule
      ),
  },
  {
    path: 'admin',
    component: NavbarsComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./admin/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'custom-roles',
        loadChildren: () =>
          import('./admin/custom-roles/custom-roles.module').then(
            (m) => m.CustomRolesModule
          ),
      },
      {
        path: 'manage-streams',
        loadChildren: () =>
          import('./admin/manage-streams/manage-streams.module').then(
            (m) => m.ManageStreamsModule
          ),
      },
      {
        path: 'manage-applicants',
        loadChildren: () =>
          import('./admin/manage-applicant/manage-applicant.module').then(
            (m) => m.ManageApplicantModule
          ),
      },
      {
        path: 'manage-users',
        loadChildren: () =>
          import('./admin/manage-users/manage-users.module').then(
            (m) => m.ManageUsersModule
          ),
      },
      {
        path: 'interview-cycle',
        loadChildren: () =>
          import('./admin/interview-cycle/interview-cycle.module').then(
            (m) => m.InterviewCycleModule
          ),
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./admin/reports/reports.module').then((m) => m.ReportsModule),
      },
    ],
  },

  {
    path: '**',
    component: ErrorPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
