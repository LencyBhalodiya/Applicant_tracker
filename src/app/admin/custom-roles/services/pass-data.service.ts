import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PassDataService {

  private baseurl = 'assets/data/customroles.json'
  
  constructor(private http:HttpClient) { }

  getRoles(){
    return  this.http.get<any[]>("http://192.168.102.92:8002/main/api/admin/getAllRole")
    // return  this.http.get<any[]>(this.baseurl)
   }
 
   getPermisson(){
     return  this.http.get<any[]>("http://192.168.102.92:8002/main/api/admin/getAllPermission") 
     //return  this.http.get<any[]>("http://localhost:3001/permission")
   }
 
   setRoles(roles:any){
     return  this.http.post<any[]>("http://192.168.102.92:8002/main/api/admin/addRole",roles)
     //return  this.http.post(this.baseurl,roles)
   }
 
   updateRoles(roles:any){
     return this.http.post("http://192.168.102.92:8002/main/api/admin/updateRole",roles)
   }
  
}
