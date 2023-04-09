import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { MaterialDesignModule } from 'src/app/shared/material-design/material-design.module';
import { EditmodalComponent } from './editmodal/editmodal.component';


@NgModule({
  declarations: [
    ProfileComponent,
    EditmodalComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MaterialDesignModule
  ]
})
export class ProfileModule { }
