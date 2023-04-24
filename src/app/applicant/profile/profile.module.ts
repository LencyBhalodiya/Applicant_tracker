import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { MaterialDesignModule } from 'src/app/shared/material-design/material-design.module';
import { EditmodalComponent } from './editmodal/editmodal.component';
import { ResumeComponent } from './resume/resume.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [ProfileComponent, EditmodalComponent, ResumeComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MaterialDesignModule,
    PdfViewerModule,
  ],
})
export class ProfileModule {}
