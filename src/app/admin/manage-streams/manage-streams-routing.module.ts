import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageStreamsComponent } from './manage-streams.component';

const routes: Routes = [{ path: '', component: ManageStreamsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageStreamsRoutingModule { }
