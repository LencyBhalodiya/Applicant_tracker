import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IApplicants } from '../models/applicants';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ManageHrService {
  private _api = 'http://192.168.102.92:8002/';

  private _getAllHr: string = `${this._api}main/api/admin/getManagedUser`;
  private _getAllRole: string = `${this._api}main/api/admin/getAllRole`;
  private _AddHr: string = `${this._api}authentication/api/v1/auth/register`;
  private _inactiveHr = `${this._api}main/api/admin/deactiveManagedUser/`;
  private _activeHr = `${this._api}main/api/admin/activeManagedUser/`;

  constructor(private _http: HttpClient) {}

  getAllHrData() {
    return this._http.get(this._getAllHr);
  }

  getRole() {
    return this._http.get(this._getAllRole);
  }

  addHr(data: any) {
    return this._http.post(this._AddHr, data);
  }

  inactiveHr(id: number) {
    return this._http.put(this._inactiveHr + id, {});
  }

  activeHr(id: number) {
    return this._http.put(this._activeHr + id, {});
  }

  private _listners = new Subject<any>();

  listen(): Observable<any> {
    return this._listners.asObservable();
  }

  filter(filterBy: string) {
    this._listners.next(filterBy);
  }
}
