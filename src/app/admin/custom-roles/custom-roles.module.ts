import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomRolesRoutingModule } from './custom-roles-routing.module';
import { CustomRolesComponent } from './custom-roles.component';
import { MaterialDesignModule } from 'src/app/shared/material-design/material-design.module';


@NgModule({
  declarations: [
    CustomRolesComponent
  ],
  imports: [
    CommonModule,
    CustomRolesRoutingModule,
    MaterialDesignModule
  ]
})
export class CustomRolesModule { }
