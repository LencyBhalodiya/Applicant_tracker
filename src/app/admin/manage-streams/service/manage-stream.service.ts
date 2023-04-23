import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManageStreamService {

  constructor(private http:HttpClient) { }

  getStreams(){
    return this.http.get<any[]>("http://192.168.102.92:8002/main/api/admin/getAllStream");
  }

  setStreams(stream:any){
    return this.http.post<any[]>("http://192.168.102.92:8002/main/api/admin/addStream",stream)
  }

  deleteStreams(id:any){
    return this.http.delete("http://192.168.102.92:8002/main/api/admin/deleteStream"+`/${id}`)
  }

  updateStream(id:any,name:any){
    return this.http.put("http://192.168.102.92:8002/main/api/admin/updateStream"+`/${id}`,name)
  }
  
}
