import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private _http: HttpClient) {}
  private _profileData =
    'http://192.168.102.92:8002/main/api/admin/getUserDetailsById/';

  private _userAddress = 'http://192.168.102.92:8002/main/api/user/getAddress/';

  // http://192.168.102.92:8002/main/api/user/getAddress/100

  private _userImage = 'http://192.168.102.92:8002/main/api/user/getImage/';

  getProfileData(id: any) {
    return this._http.get(this._profileData + id);
  }

  getUserAddress(id: any) {
    return this._http.get(this._userAddress + id);
  }
  getResume(userId: number): Observable<Blob> {
    return this._http.get(
      'http://192.168.102.92:8002/main/api/user/getfile/' + userId,
      { responseType: 'blob' }
    );
  }
  getImage(userId: string) {
    return this._http.get(this._userImage + userId, { responseType: 'blob' });
  }
}
