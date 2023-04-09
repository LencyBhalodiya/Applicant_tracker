import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PassDataService } from './services/pass-data.service';

//Interface For Roles Data
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

  manageRoles: manageroles[] = [
    {
      id: 1,
      access: "DashBord"
    },
    {
      id: 2,
      access: "Add Recruiter"
    },
    {
      id: 3,
      access: "Manage Recruiter"
    },
    {
      id: 4,
      access: "Manage Applicants"
    },
    {
      id: 5,
      access: " Report"
    },
    {
      id: 6,
      access: " Manage Streams"
    },
    {
      id: 7,
      access: " Add Custom Roles"
    },
  ]
  selectedOptions: any[] = [];
  rolesData!: any //Property to store username and its roles
  @ViewChild('roleInput') roleInput!: ElementRef<HTMLInputElement>;
  roleCtrl = new FormControl('');
  // separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private _snackBar: MatSnackBar, private passDataroles: PassDataService) { }

  //Getting Roles Data
  ngOnInit() {
    this.passDataroles.getRoles().subscribe((role) => {
      this.rolesData = role
    })
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', { duration: 2000 });
  }

  //Function to store Selected Checkbox
  getData(val: HTMLElement) {
    this.selectedOptions.push(val.innerHTML)
  }

  //Function to store username and roles 
  getValue(name: HTMLInputElement, btn: HTMLElement) {
    this.rolesData.push({
      name: name.value,
      roles: this.selectedOptions
    })
    name.value = "";
    (<HTMLButtonElement>btn).disabled = true;
  }

  // ngAfterViewInit(){
  //   this.passDataroles.setRoles(this.rolesData).subscribe((result)=>result)
  // }

  //Input Validation
  enable(element: HTMLElement, userName: string) {
    if (userName == "") {
      (<HTMLButtonElement>element).disabled = true
    }
    else {
      (<HTMLButtonElement>element).disabled = false
    }
  }
  
  //Function to Remove Roles Assigned to user
  remove(roles: any, ind: number): void {
    const index = this.rolesData[ind].roles.indexOf(roles);
    if (index >= 0) {
      this.rolesData[ind].roles.splice(index, 1);
    }
  }

  //Function to add Roles from dropdown menu
  selected(event: MatAutocompleteSelectedEvent, index: number): void {
    this.rolesData[index].roles.push(event.option.viewValue);
    this.roleInput.nativeElement.value = '';
    this.roleCtrl.setValue(null);
  }


}
