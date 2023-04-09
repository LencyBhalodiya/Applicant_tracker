import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageStreamsRoutingModule } from './manage-streams-routing.module';
import { ManageStreamsComponent } from './manage-streams.component';
import { MaterialDesignModule } from 'src/app/shared/material-design/material-design.module';
import { StreamComponent } from './stream/stream.component';


@NgModule({
  declarations: [
    ManageStreamsComponent,
    StreamComponent
  ],
  imports: [
    CommonModule,
    ManageStreamsRoutingModule,
    MaterialDesignModule
  ]
})
export class ManageStreamsModule { }
