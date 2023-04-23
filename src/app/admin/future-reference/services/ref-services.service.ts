import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefServicesService {

  constructor(private http: HttpClient) { }
  private url  = 'http://192.168.102.92:8002/main/api/admin/getAllFutureRef';
  searchUrl = this.url;

  futureRef() {
    return this.http.get(this.url)
  }
}
