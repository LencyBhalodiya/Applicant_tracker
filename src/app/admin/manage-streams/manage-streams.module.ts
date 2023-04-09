import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageStreamsRoutingModule } from './manage-streams-routing.module';
import { ManageStreamsComponent } from './manage-streams.component';


@NgModule({
  declarations: [
    ManageStreamsComponent
  ],
  imports: [
    CommonModule,
    ManageStreamsRoutingModule
  ]
})
export class ManageStreamsModule { }
