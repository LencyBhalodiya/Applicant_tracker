import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialDesignModule } from './shared/material-design/material-design.module';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { AuthComponent } from './shared/auth/auth.component';
import { NavbarsComponent } from './shared/navbars/navbars.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterationComponent } from './applicant/registeration/registeration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFileDropModule } from 'ngx-file-drop';
import { AuthInterceptor } from './shared/auth/auth-services/auth.interceptor';
import { ForgotPasswordComponent } from './shared/forgot-password/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './shared/reset-password/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    // ErrorPageComponent,
    AuthComponent,
    NavbarsComponent,
    RegisterationComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialDesignModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFileDropModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
