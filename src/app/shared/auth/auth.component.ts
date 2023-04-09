import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
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

 registerForm = new FormGroup({
   fname : new FormControl('',[
     Validators.required
   ]),
   lname : new FormControl('',[
     Validators.required
   ]),
   email: new FormControl('', [
     Validators.required,
     Validators.pattern('[a-z0-9]+@[a-z]+.[a-z]{2,3}'),
   ]),
   phoneNumber : new FormControl('',[
     Validators.required,
     Validators.maxLength(10),
     Validators.minLength(10)
   ]),
   gender :new FormControl('',[
     Validators.required
   ])
 })
 registerUser(){
   console.log(this.registerForm.value);
 }
 dispalyHide(signup:HTMLElement,signin:HTMLElement){
   signup.style.display="none"
   signin.style.display="flex"
 }
}
