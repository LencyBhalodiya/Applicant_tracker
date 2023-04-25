import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public successEmailStatus = new BehaviorSubject<number>(0);
  public successPasswordFlag = new BehaviorSubject<boolean>(false);
  constructor(private _http: HttpClient, public snackBar:MatSnackBar) { }

  //  post request to for email
  postEmail(value: string): BehaviorSubject<number> {
    let par: HttpParams = new HttpParams().append("email", value)
    this._http.post('http://192.168.102.92:8002/authentication/api/v1/auth/forgotPassword?', { "email": value }, { params: par })
      .subscribe({
        next: (res: any) => {
          this.successEmailStatus.next(200)
          this.snackBar.open("Email sent successfully", "Close", {duration: 2000});

        },
        error: (err: any) => {
          if (err.status === 200) {
            this.snackBar.open("Email sent successfully", "Close", {duration: 2000});
          }
          else{
            this.snackBar.open("something went wrong", "Close", {duration: 2000});
          }
         
        },
      }
      // return this.successEmailStatus
      )
    return this.successEmailStatus
  }

  // post request to set password
  setPassword(data: object): BehaviorSubject<boolean> {
    this._http.post('http://192.168.102.92:8002/authentication/api/v1/auth/setPassword', data)
      .subscribe({
        next: (res) => {
          this.successPasswordFlag.next(true);
          this.snackBar.open("password set successfull", "Close", {duration: 2000});
          
        },
        error: (err: any) => {
          if (err.status === 200) {
            this.snackBar.open("password set successfull", "Close", {duration: 2000});            
          }
          else{
            this.snackBar.open("something went wrong", "Close", {duration: 2000});
          }
        }
      })
    return this.successPasswordFlag
  }
}
