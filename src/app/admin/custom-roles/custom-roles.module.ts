import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomRolesRoutingModule } from './custom-roles-routing.module';
import { CustomRolesComponent } from './custom-roles.component';


@NgModule({
  declarations: [
    CustomRolesComponent
  ],
  imports: [
    CommonModule,
    CustomRolesRoutingModule
  ]
})
export class CustomRolesModule { }
