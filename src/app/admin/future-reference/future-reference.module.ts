import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FutureReferenceRoutingModule } from './future-reference-routing.module';
import { FutureReferenceComponent } from './future-reference.component';
import { MaterialDesignModule } from 'src/app/shared/material-design/material-design.module';


@NgModule({
  declarations: [
    FutureReferenceComponent
  ],
  imports: [
    MaterialDesignModule,
    CommonModule,
    FutureReferenceRoutingModule
  ]
})
export class FutureReferenceModule { }
