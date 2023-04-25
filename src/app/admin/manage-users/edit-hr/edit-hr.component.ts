import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageHrService } from '../services/manage-hr.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IRoles } from '../models/applicants';

@Component({
  selector: 'app-edit-hr',
  templateUrl: './edit-hr.component.html',
  styleUrls: ['./edit-hr.component.css'],
})
export class EditHrComponent implements OnInit {
  roles!: any;

  rolen: any = {};
  response:any;

  editHrForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private hrSer: ManageHrService,
    public snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.editHrForm = this.fb.group({
      firstname: new FormControl(this.editData.firstname),
      lastname: new FormControl(this.editData.lastname),
      email: new FormControl(this.editData.email),
      role: new FormControl(this.editData.rolename),
    });

    this.hrSer.getRole().subscribe((res) => {
      console.log(res);
      this.roles = res;
    });
  }

  updateHr(data: any): void {
    console.log(data);
    let res = {
      firstName: '',
      lastName: '',
      email: '',
      role: {
        id: 0,
        rolename: '',
      },
    };

    res.firstName = data.email;
    res.lastName = data.firstname;
    res.email = data.lastname;
    let role1 = this.roles.find((role: any) => {
      return role.rolename === data.role;
    });
    let role = { id: 0, rolename: '' };
    role.id = role1.id;
    role.rolename = role1.rolename;

    res.role = role;
    this.response=res;

    // this.hrSer.editHr(res, this.editData.id).subscribe({
    //   next: (res) => {
    //     this.snackbar.open('User Updated Sucessfully', 'OK', {
    //       duration: 3000,
    //     });
    //   },
    //   error: (e) => console.log(e),
    //   complete: () => console.log('user edited'),
    // });
  
  }
}
