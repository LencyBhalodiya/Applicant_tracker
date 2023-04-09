import { NgModule, ResolvedReflectiveFactory } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomRolesComponent } from './custom-roles.component';

const routes: Routes = [
  { path: '', component: CustomRolesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomRolesRoutingModule {}
