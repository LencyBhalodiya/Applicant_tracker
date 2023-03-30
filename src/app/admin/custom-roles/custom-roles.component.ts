import { Component } from '@angular/core';

@Component({
  selector: 'app-custom-roles',
  templateUrl: './custom-roles.component.html',
  styleUrls: ['./custom-roles.component.css']
})
export class CustomRolesComponent {
  adminname="Jignesh Tanna"
  manageRoles:Array<any>=['Dashboard','Add Recruiter','Manage Recruiter','Manage Applicants','Report','Manage Streams','Add Custom Roles']
}
