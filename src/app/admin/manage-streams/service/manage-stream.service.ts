import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManageStreamService {

  private baseUrl = '/assets/data/mange-stream.json';

  constructor(private http:HttpClient) { }

  getStreams(){
    return this.http.get(this.baseUrl);
  }

  setStreams(stream:any){
    return this.http.post(this.baseUrl,stream)
  }
}
