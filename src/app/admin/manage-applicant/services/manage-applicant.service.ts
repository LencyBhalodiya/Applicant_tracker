import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IApplicants } from '../models/applicants';


@Injectable({
  providedIn: 'root'
})
export class ManageApplicantService {
  private _url: string = 'http://192.168.102.92:8002/main/api/admin';
  private _urlNewApplicants: string = 'http://192.168.102.92:8002/main/api/admin/getNewUser';
  private _filterUrl = 'http://192.168.102.92:8002/main/api/admin/get';

  statuses: string[] = [
    'Offered',
    'Rejected',
    'Test Cleared',
    'Pending',
    'On Hold',
    'Backed-out',
  ];
  // http://192.168.102.92
  rounds!: string[];
  errorMessage!: string;
  constructor(private _http: HttpClient) { }

  // get all Approved applicants
  getData(page: number) {
    return this._http.get(this._url + "/getAllUser" + "?page=" + page + "?pageSize = 15");
  }

  // get new applicants
  getNewApplicants() {
    return this._http.get(this._urlNewApplicants);
  }

  // get stages
  getStages() {
    return this._http.get<any>("http://192.168.102.92:8002/main/api/admin/getAllStage");
  }


  // get streams
  getStreams() {
    return this._http.get<any>('http://192.168.102.92:8002/main/api/admin/getAllStream');
  }

  // get Status
  getStatuses() {
    return this.statuses;
  }

  // update feedback
  updateFeedback(response: any) {
    return this._http
      .post<any>(this._url + '/updateTracking', response)
      .subscribe((res) => console.log(res));
  }

  // bulk feedback
  bulkFeedback(response: any) {
    return this._http.post<any>(this._url + '/BulkUpdateFeedback', response).subscribe(res => console.log(res));
  }

  // promote applicant 
  promoteApplicant(response: any) {
    return this._http
      .post<any>(this._url + '/updateTracking', response)
      .subscribe((res) => console.log(res));
  }

  // bulk Promote
  bulkPromote(response: any) {
    return this._http
      .post<any>(this._url + '/BulkUpdateCreate', response)
      .subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
  }

  // error handler
  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      this.errorMessage = error.message;
      console.error('An error occurred:', error.error);
    } else {
      this.errorMessage = error.message;
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return this.errorMessage;
  }

  //  filter
  applyFilter(url: string) {
    console.log(this._filterUrl + url);
    return this._http.get(this._filterUrl + url).subscribe(res => console.log(res));
  }

  // add to procedure
  addToProcess(response: any) {
    return this._http.post(this._url + '/createTracking', response).subscribe(res => console.log(res));
  }


}

