import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IApplicants } from '../models/applicants';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ManageHrService {
  public dataSource = new BehaviorSubject({});

  // private _api:string = 'http://192.168.102.92:8002/main/api/admin/';
  private _getAllHr: string =
    'http://192.168.102.92:8002/main/api/admin/getManagedUser';
  private _getAllRole: string =
    'http://192.168.102.92:8002/main/api/admin/getAllRole';
  private _AddHr: string =
    'http://192.168.102.92:8002/authentication/api/v1/auth/register';

  private _inactiveHr =
    'http://192.168.102.92:8002/main/api/admin/deactiveManagedUser/';

  private _activeHr =
    'http://192.168.102.92:8002/main/api/admin/activeManagedUser/';

  private _editHr =
    'http://192.168.102.92:8002/main/api/user/updateUserDetails/';

  constructor(private _http: HttpClient) {}

  getData() {
    this._http.get(this._getAllHr).subscribe((res) => {
      this.dataSource.next(res);
    });

    return this.dataSource;
  }

  getRole() {
    return this._http.get(this._getAllRole);
  }

  addhr(data: any) {
    return this._http.post(this._AddHr, data);
  }

  editHr(data: any, id: any) {
    return this._http.post(this._editHr + id, data);
  }

  inactiveHr(id: number) {
    return this._http.put(this._inactiveHr + id, {});
  }

  activeHr(id: number) {
    return this._http.put(this._activeHr + id, {});
  }
}
