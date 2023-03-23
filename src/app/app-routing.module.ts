import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileEditComponent } from './applicant/profile-edit/profile-edit.component';
import { UserDashboardComponent } from './applicant/user-dashboard/user-dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'applicant',
    component: UserDashboardComponent,
  },
  {
    path: 'applicant/edit',
    component: ProfileEditComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    children:[{
      path:'dashboard',
      component: AdminDashboardComponent
    }]
  },
  { path: '**', component: PageNotFoundComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
