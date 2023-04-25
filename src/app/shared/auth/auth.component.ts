import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth-services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  public showPassword: boolean = false;
  constructor(private auth: AuthService) {}
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
    ]),
  });
  loginUser() {
    this.auth.signIn(this.loginForm.value);
  }
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  ngOnInit(): void {}

  registerForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9]+@[a-z]+.[a-z]{2,3}'),
    ]),
    password: new FormControl('', [
      Validators.pattern(
        /(?=.*[a-z])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
      ),
      Validators.maxLength(16),
      Validators.minLength(8),
      Validators.required,
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{10}'),
    ]),
    dob: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
  });
  registerUser() {
    var datePipe = new DatePipe('en-US');
    var setDob = datePipe.transform(this.registerForm.value.dob, 'yyyy-MM-dd');

    setDob = this.registerForm.value.dob = setDob;
    console.log(this.registerForm.value);

    this.auth.signUp(this.registerForm.value);
  }
  dispalyHide(signup: HTMLElement, signin: HTMLElement) {
    signup.style.display = 'none';
    signin.style.display = 'flex';
  }
}
