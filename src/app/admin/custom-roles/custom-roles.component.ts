import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PassDataService } from './services/pass-data.service';


  interface manageroles {
  id: number;
  access: string
}
@Component({
  selector: 'app-custom-roles',
  templateUrl: './custom-roles.component.html',
  styleUrls: ['./custom-roles.component.css']
})


export class CustomRolesComponent {

  selectedOptions:any[]=[];
  data:any[]=[]
  manageRoles: manageroles[] = [
    {
      id: 1,
      access: "DashBord"
    },
    {
      id:2,
      access:"Add Recruiter"
    },
    {
      id:3,
      access:"Manage Recruiter"
    },
    {
      id:4,
      access:"Manage Applicants"
    },
    {
      id:5,
      access:" Report"
    },
    {
      id:6,
      access:" Manage Streams"
    },
    {
      id:7,
      access:" Add Custom Roles"
    },
  ]
  constructor(private _snackBar: MatSnackBar , private passDataroles : PassDataService ) { }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', { duration: 2000 });
  }

  getData(value: HTMLElement) {
    this.selectedOptions.push(String(value.innerHTML))
  }

  getValue(name:string) {
    this.data.push({
      name:name,
      roles:this.selectedOptions
    })
    console.log(this.data)
  }
 
  ngAfterViewInit(){
    this.passDataroles.setRoles(this.data).subscribe((result)=>result)
  }
}
