import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PassDataService {

  private baseurl = 'assets/data/customroles.json'
  
  constructor(private http:HttpClient) { }

  getRoles(){
    return  this.http.get(this.baseurl)
  }

  setRoles(roles:any){
    return  this.http.post(this.baseurl,roles)
  }
  
}
