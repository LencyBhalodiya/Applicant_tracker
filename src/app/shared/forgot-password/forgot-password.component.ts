import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  public successStatus!:number
  constructor(private _url: Router, public dialog: MatDialog, private _shared: SharedService, public snackBar: MatSnackBar) { }
  forgotPassword = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ])
  });

  // on submit send email
  resetPassword() {
    var email: any = this.forgotPassword.value.email;
    this.forgotPassword.reset();
    let response = this._shared.postEmail(email);
    response.subscribe(res => this.successStatus = res)
      if (this.successStatus === 200)
        this.snackBar.open("email sent successfully", "ok", { duration: 5000 });
      else if(this.successStatus == 400)
        this.snackBar.open("user does not exist", "ok", { duration: 5000 });
      else
        this.snackBar.open("something went wrong", "try again", { duration: 5000 });
    }
  }
