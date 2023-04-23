import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  public showPassword: boolean = false;
  public showConfirmPassword: boolean = false;
  private _uId: string | null | undefined;
  private _data: object = {};
  constructor(private _route: ActivatedRoute, private _shared: SharedService, public snackBar: MatSnackBar) { }
  resetPassword = new FormGroup({
    password: new FormControl('',[
      Validators.required,
      Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)
    ]),
    confirmPassword: new FormControl('',[
      Validators.required,
      Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)
    ])
  });


  // password visibility
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // confirm password visibility
  public toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // send post request
  onSubmit() {
    let pwd = this.resetPassword.value.password;
    let confirmPwd = this.resetPassword.value.confirmPassword;
    let uid = this._route.snapshot.paramMap.get("uid")
    if (pwd === confirmPwd) {
      this._data = { uid: 2, password: pwd }
      this._shared.setPassword(this._data);
      console.log(this._shared.successPasswordFlag.subscribe((res:any)=>{return res}))
      if (this._shared.successPasswordFlag.subscribe((res:boolean)=>{return res}))
        this.snackBar.open("password set successfully", "ok", { duration: 5000 })
      else
        this.snackBar.open("Something went wrong please try again", "ok", { duration: 5000 })
    }
    else
      this.snackBar.open("Password didn't match!", "ok", { duration: 5000 })
  }
}

