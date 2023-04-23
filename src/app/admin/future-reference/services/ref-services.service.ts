import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RefServicesService {

  constructor(private http: HttpClient) { }
  private url  = 'http://192.168.102.92:8002/main/api/admin/getAllFutureRef';

  futureRef() {
    return this.http.get(this.url);
  }
}
