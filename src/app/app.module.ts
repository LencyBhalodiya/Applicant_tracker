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
import { ManageRecruiterComponent } from './admin/manage-recruiter/manage-recruiter.component';
import { InterviewCycleComponent } from './admin/interview-cycle/interview-cycle.component';
import { CustomRolesComponent } from './admin/custom-roles/custom-roles.component';
import { AddRecruiterComponent } from './admin/add-recruiter/add-recruiter.component';
import { ReportsComponent } from './admin/reports/reports.component';
import { ManageStreamsComponent } from './admin/manage-streams/manage-streams.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileEditComponent,
    UserDashboardComponent,
    PageNotFoundComponent,
    LoginComponent,
    AdminComponent,
    AdminDashboardComponent,
    ManageRecruiterComponent,
    InterviewCycleComponent,
    CustomRolesComponent,
    AddRecruiterComponent,
    ReportsComponent,
    ManageStreamsComponent
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
