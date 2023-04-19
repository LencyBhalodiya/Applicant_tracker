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

  public successFlag!: boolean;
  constructor(private _url: Router, public dialog: MatDialog, private _shared:SharedService, public snackBar:MatSnackBar) { }
  forgotPassword = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(1)
    ])
  });

  resetPassword(){
    // console.log(this.forgotPassword.value);
    var email:any = this.forgotPassword.value.email;
    this.forgotPassword.reset();
    this._shared.postEmail(email);
    this.snackBar.open("email sent successfully", "ok", { duration: 5000 });

    
       
    // alert(res)

  }


}
