import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, public router: Router) {}
  private roleName!: string;
  signIn(data:any) {
    let api =
      'http://192.168.102.92:8002/authentication/api/v1/auth/authenticate';
    return this.http.post(api, data).subscribe(
      (res: any) => {
        localStorage.setItem('access_token', res.token);
        const role = this.getTokenRole();
        if (role === 'user') this.router.navigate(['applicant']);
        else this.router.navigate(['admin']);
      },
      (error) => {
        console.log(error);
        alert('Invalid Credentials');
      }
    );
  }

  signUp(data: any) {
    let api = 'http://192.168.102.92:8002/authentication/api/v1/auth/register';
    let role = {
      id: 3,
      rolename: 'user',
    };
    data.gender = data.gender.toUpperCase();
    data.role = role;

    return this.http.post(api, data).subscribe(
      (res: any) => {
        console.log(res);
      },
      (error) => {
        console.log('registeration:  ', error);
      }
    );
  }

  getToken() {
    return localStorage.getItem('access_token');
  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  getTokenRole() {
    let token = localStorage.getItem('access_token');
    if (!token) this.router.navigate(['auth']);

    let role: any = jwt_decode(token!);

    role = role.sub.split(',')[1];
    console.log(role);

    return role;
  }

  getUserId() {
    var token = localStorage.getItem('access_token');
    if (!token) this.router.navigate(['auth']);

    let roleId: any = jwt_decode(token!);
    roleId = roleId.sub.split(',')[0];

    return roleId;
  }
  logOut() {
    localStorage.removeItem('access_token');
    this.router.navigate(['auth']);
  }
}
