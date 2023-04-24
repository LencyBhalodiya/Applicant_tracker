import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public successEmailStatus = new BehaviorSubject<number>(0);
  public successPasswordFlag = new BehaviorSubject<boolean>(false);
  constructor(private _http: HttpClient) { }

  //  post request to for email
  postEmail(value: string): BehaviorSubject<number> {
    let par: HttpParams = new HttpParams().append("email", value)
    this._http.post('http://192.168.102.92:8002/authentication/api/v1/auth/forgotPassword?', { "email": value }, { params: par })
      .subscribe({
        next: (res: any) => {
          this.successEmailStatus.next(200)
        },
        error: (err: any) => {
          console.log("error: ", parseInt(err.status));
          this.successEmailStatus.next(err.status);
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
        }
      })
    return this.successPasswordFlag
  }
}
