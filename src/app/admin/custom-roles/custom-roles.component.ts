import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PassDataService } from './services/pass-data.service';

@Component({
  selector: 'app-custom-roles',
  templateUrl: './custom-roles.component.html',
  styleUrls: ['./custom-roles.component.css']
})
export class CustomRolesComponent implements OnInit{

  
  managePermissions!:any[]
  selectedOptions: any[] = [];
  rolesData!: any[] //Property to store username and its roles
  @ViewChild('roleInput') roleInput!: ElementRef<HTMLInputElement>;
  @ViewChildren('check') private myCheckboxes !: QueryList<any>;

  constructor(private _snackBar: MatSnackBar, private passDataroles: PassDataService) { }

  //Getting Roles Data
  ngOnInit() {
    this.passDataroles.getPermisson().subscribe((role) =>{
      this.managePermissions = role
    })
    this.passDataroles.getRoles().subscribe((role) => {
      this.rolesData = role
    })
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', { duration: 2000 });
  }

  //Function to store Selected Checkbox
  getData(val: number,name:string,check:MatCheckbox) {
    if(check.checked==false)
    {
      this.selectedOptions=this.selectedOptions.filter((item)=>{return item.id !== val})
    }
    else{
      
      this.selectedOptions.push({id:val,name:name})
    }
        
  }

  //Function to store username and roles 
  getValue(name: HTMLInputElement, btn: HTMLElement) {
    for(let element of this.rolesData){
      if(element.rolename.toLowerCase().trim().split(" ").join("")==name.value.toLowerCase().trim().split(" ").join("")){
          this.openSnackBar("Role Already Exist")
          return
      }
    }
    this.passDataroles.setRoles({rolename:name.value,permissions:this.selectedOptions}).subscribe((res)=>console.log(res))
    this.openSnackBar('Roles Added')
    name.value = "";
    (<HTMLButtonElement>btn).disabled = true;
    setTimeout(()=>{
      this.passDataroles.getRoles().subscribe((role) => {
        this.rolesData = role
      })
    },1500)
  }

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
    const index = this.rolesData[ind].permissions.indexOf(roles);
    if (index >= 0) {
      this.rolesData[ind].permissions.splice(index, 1);
      this.passDataroles.updateRoles({id:this.rolesData[ind].id,rolename:this.rolesData[ind].rolename,permissions: this.rolesData[ind].permissions}).subscribe(res=>console.log(res))
    }
  }

  //Function to add Roles from dropdown menu
  selected(event: any, index: number): void {
    
    let flag=true;
    for(let role of this.rolesData[index].permissions){
      if(event.option.viewValue.toLowerCase()==role.name.toLowerCase())
      {
          flag=false;
      }
    }
    if(flag==true){
      this.rolesData[index].permissions.push({id:event.option.value.id,name:event.option.value.name});
      this.roleInput.nativeElement.value = '';
      console.log(this.rolesData[index])
      this.passDataroles.updateRoles({id:this.rolesData[index].id,rolename:this.rolesData[index].rolename,permissions: this.rolesData[index].permissions}).subscribe(res=>console.log(res))
    }
  }

  unchecked(){
    let myCheckboxes=this.myCheckboxes.toArray()
    for(let i=0 ; i<myCheckboxes.length ; i++)
    {
      myCheckboxes[i].checked=false
    }
  }

}
