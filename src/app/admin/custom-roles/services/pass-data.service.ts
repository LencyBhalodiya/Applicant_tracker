import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PassDataService {
  private baseurl = '/home/asite/Project/Applicant_tracker/src/app/admin/custom-roles/json/customroles.json'
  constructor(private http:HttpClient) { }

  setRoles(roles:any){
    return  this.http.post(this.baseurl,roles)
  }
}
