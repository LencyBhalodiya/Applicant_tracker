import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PassDataService {

  constructor(private http:HttpClient) { }

  getRoles(){
    return  this.http.get<any[]>("http://192.168.102.92:8002/main/api/admin/getAllRole")
   }
 
   getPermisson(){
     return  this.http.get<any[]>("http://192.168.102.92:8002/main/api/admin/getAllPermission") 
   }
 
   setRoles(roles:any){
     return  this.http.post<any[]>("http://192.168.102.92:8002/main/api/admin/addRole",roles)
   }  
 
   updateRoles(roles:any){
     return this.http.post("http://192.168.102.92:8002/main/api/admin/updateRole",roles)
   }
  
}
