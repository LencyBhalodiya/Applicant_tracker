import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from './auth-services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  public showPassword: boolean = false;
  loginPage: boolean = true;
  ngOnInit(): void {
    setTimeout(() => {
      this.checkToken();
    }, 1500);
  }
  constructor(
    private auth: AuthService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
    ]),
  });

  switch() {
    this.loginPage = !this.loginPage;
  }
  loginUser() {
    this.auth.signIn(this.loginForm.value);
  }
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

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
    phoneNumber: new FormControl('', [ Validators.required, Validators.pattern('[0-9]{10}'), ]),
    dob: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
  });
  registerUser() {
    let msg: any;
    var datePipe = new DatePipe('en-US');
    var setDob = datePipe.transform(this.registerForm.value.dob, 'yyyy-MM-dd');

    setDob = this.registerForm.value.dob = setDob;

    this.auth.signUp(this.registerForm.value).subscribe(
      (res) => {
        msg = res;
        if (msg.message.includes('Already'))
          this.snackBar.open('Email already exists', 'ok', { duration: 2000 });
        else{
          this.snackBar.open('Registered Successfully', 'ok', {
            duration: 2000,
          });
          this.switch();
        }
      },
      (error) => {
        this.snackBar.open('Some Error Occured', 'ok', { duration: 2000 });
      }
    );
  }

  checkToken() {
    let token = localStorage.getItem('access_token');

    if (token === 'null' || !token || token === null) {      
      localStorage.removeItem('access_token');
    } else {
      let role = this.auth.getTokenRole();
      if (role === 'user') this.router.navigate(['applicant']);
      else this.router.navigate(['admin']);
    }
  }
}
