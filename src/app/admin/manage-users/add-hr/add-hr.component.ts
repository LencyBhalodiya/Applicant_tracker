import { DatePipe } from '@angular/common';
import { of } from 'rxjs';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import {
  FormArrayName,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ManageHrService } from '../services/manage-hr.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-hr',
  templateUrl: './add-hr.component.html',
  styleUrls: ['./add-hr.component.css'],
})
export class AddHrComponent implements OnInit {
  roles: any;
  rolen: any = {};

  hide = true;

  datePipe = new DatePipe('en-US');

  addHrForm!: FormGroup;
  isFormSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private hrSer: ManageHrService,
    public snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.addHrForm = this.fb.group({
      firstname: new FormControl('', [
        Validators.required,
        Validators.pattern(''),
      ]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(''),
      ]),
      dob: new FormControl('', [Validators.required, Validators.pattern('')]),
      role: new FormControl('', [Validators.required, Validators.pattern('')]),
      gender: new FormControl('', [
        Validators.required,
        Validators.pattern(''),
      ]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(''),
      ]),
    });

    this.hrSer.getRole().subscribe((res) => {
      this.roles = res;
      console.log(res);
    });
  }

  addHr(data: any): any {
    this.isFormSubmitted = true;
    data.dob = this.datePipe.transform(data.dob, 'yyyy-MM-dd');
    this.rolen.id = data.role.id;
    this.rolen.name = data.role.rolename;
    data.role = this.rolen;
    // console.log(this.rolen);
    console.log(data);

    this.hrSer.addhr(data);

    // this.hrSer.getData().subscribe((res) => {
    //   console.log(res);
    // });
  }
}
