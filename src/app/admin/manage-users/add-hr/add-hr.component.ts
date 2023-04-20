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

  constructor(
    private fb: FormBuilder,
    private manageHrService: ManageHrService
  ) {}

  ngOnInit(): void {
    this.addHrForm = this.fb.group({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern('')]),
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
      phoneno: new FormControl('', [
        Validators.required,
        Validators.pattern(''),
      ]),
    });

    this.manageHrService.getRole().subscribe((res) => {
      this.roles = res;
      console.log(res);
    });
  }

  addHr(data: any): any {
    data.dob = this.datePipe.transform(data.dob, 'yyyy-MM-dd');
    this.rolen.id = data.role.id;
    this.rolen.name = data.role.rolename;
    data.role = this.rolen;
    // console.log(this.rolen);
    console.log(data);

    this.manageHrService.addHr(data).subscribe({
      next: (res) => console.log(res),
      error: (e) => console.log(e),
      complete: () => console.log('user added'),
    });

    // this.manageHrService.getAllHrData().subscribe((res) => {
    //   console.log(res);
    // });
  }

  onClose(): void {
    this.manageHrService.filter('Click');
  }
}
