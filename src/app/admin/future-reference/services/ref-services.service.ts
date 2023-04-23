import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefServicesService {

  constructor(private http: HttpClient) { }
  private url  = 'http://192.168.102.92:8002/main/api/admin/getAllFutureRef';
  private searchUrl = 'http://192.168.102.92:8002/main/api/admin/searchFutureRef'


  futureRef() {
    return this.http.get(this.url)
  }
  searchFilter(input:string){
    return this.http.get(`${this.searchUrl}/${input}`)
  }
}
