import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialDesignModule } from './material-design/material-design.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileEditComponent } from './applicant/profile-edit/profile-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserDashboardComponent } from './applicant/user-dashboard/user-dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'; 
import { LoginComponent } from './login/login.component'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { InterviewCycleComponent } from './admin/interview-cycle/interview-cycle.component';
import { CustomRolesComponent } from './admin/custom-roles/custom-roles.component';
import { ReportsComponent } from './admin/reports/reports.component';
import { ManageStreamsComponent } from './admin/manage-streams/manage-streams.component';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { ManageApplicantComponent } from './admin/manage-applicant/manage-applicant.component';
import { AdminChartsComponent } from './admin/admin-dashboard/admin-charts/admin-charts.component';
import { FeedbackComponent } from './admin/manage-applicant/feedback/feedback.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileEditComponent,
    UserDashboardComponent,
    PageNotFoundComponent,
    LoginComponent,
    AdminComponent,
    AdminDashboardComponent,
    InterviewCycleComponent,
    CustomRolesComponent,
    ReportsComponent,
    ManageStreamsComponent,
    ManageUsersComponent,
    ManageApplicantComponent,
    AdminChartsComponent,
    FeedbackComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialDesignModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
