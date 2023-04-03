import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFabButton } from '@angular/material/button';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public showPassword: boolean = false;
  constructor() {}
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9]+@[a-z]+.[a-z]{2,3}'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
    ]),
  });
  loginUser() {
    console.log(this.loginForm.value);
  }
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  ngOnInit(): void {}
}
