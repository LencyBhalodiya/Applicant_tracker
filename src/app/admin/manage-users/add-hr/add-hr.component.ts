import { Component, OnInit } from '@angular/core';
import { FormArrayName, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-hr',
  templateUrl: './add-hr.component.html',
  styleUrls: ['./add-hr.component.css']
})
export class AddHrComponent implements OnInit {
  hide = true;


  addHrForm!:FormGroup
  constructor(private fb:FormBuilder){}

  ngOnInit(): void {
    this.addHrForm = this.fb.group({


      fname : new FormControl('') ,
      lname : new FormControl('') ,
      email : new FormControl(''),
      password:new FormControl(''),
      dob:new FormControl(''),
      role:new FormControl(''),
      gender:new FormControl(''),
      phoneno:new FormControl('')


    })
    
  }

  addHr(data:any):void
  {

    console.log(data.value);
  }

 


}
