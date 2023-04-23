import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-hr',
  templateUrl: './edit-hr.component.html',
  styleUrls: ['./edit-hr.component.css']
})
export class EditHrComponent implements OnInit {

  editHrForm!: FormGroup
  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public editData: any) { }

  ngOnInit(): void {
    this.editHrForm = this.fb.group({


      fname: new FormControl(this.editData.fname),
      lname: new FormControl(this.editData.lname),
      email: new FormControl()


    })

  }

  updateHr(data: any): void {

    console.log(data.value);
  }

}
