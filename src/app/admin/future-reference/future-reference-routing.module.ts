import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FutureReferenceComponent } from './future-reference.component';

const routes: Routes = [
  {
    path: '',
    component: FutureReferenceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FutureReferenceRoutingModule { }
