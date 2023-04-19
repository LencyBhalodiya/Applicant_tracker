import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private _http: HttpClient) {}
  private _profileData =
    'http://192.168.102.92:8002/main/api/admin/getUserDetailsById/';

  getProfileData(id: any) {
    return this._http.get(this._profileData + id);
  }
}
