import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-custom-roles',
  templateUrl: './custom-roles.component.html',
  styleUrls: ['./custom-roles.component.css']
})
export class CustomRolesComponent {

  selectedOptions:any[]=[];
// selectedOption = "";

  adminname="Jignesh Tanna"
  manageRoles:Array<any>=['Dashboard','Add Recruiter','Manage Recruiter','Manage Applicants','Report','Manage Streams','Add Custom Roles']

  // onNgModelChange($event:any){
  //   console.log($event);
  //   this.selectedOption=$event;
  // }
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: string) {

   
    this._snackBar.open(message,'',{duration:3000});
  }

  getData(value:HTMLElement){
        //console.log(value.innerHTML)
      
      this.selectedOptions.push(String(value.innerHTML))
  }

  getValue(){
          console.log(this.selectedOptions)
  }
}
