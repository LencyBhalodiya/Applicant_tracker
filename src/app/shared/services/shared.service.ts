import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(private _http: HttpClient) { }

  postEmail(email: string) {
    return this._http.post(`http://192.168.102.92:8002/authentication/api/v1/auth/forgotPassword?email=${email}`, null)
      .subscribe((res) => {
        console.log("response", res);
      }, error => {
        console.log(error);
      })
  }

  setPassword(data: object) {
    return this._http.post('http://192.168.102.92:8002/authentication/api/v1/auth/setPassword', data).
      subscribe(res => { return res });
  }
}
