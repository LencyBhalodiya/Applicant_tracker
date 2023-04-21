import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ManageApplicantService {
  private _url: string = 'http://192.168.102.92:8002/main/api/admin';
  private _urlNewApplicants: string =
    'http://192.168.102.92:8002/main/api/admin/getNewUser';
  private _filterUrl = 'http://192.168.102.92:8002/main/api/admin/get';

  statuses: string[] = [
    'Offered',
    'Rejected',
    'Test Cleared',
    'pending',
    'On Hold',
    'Backed-out',
  ];
  
  // http://192.168.102.92
  rounds!: string[];
  errorMessage!: string;
  datasource = new BehaviorSubject<any>([]);
  constructor(private _http: HttpClient) {}

  // get all Approved applicants
  getData(page: number) {
    this._http
      .get(this._url + '/getAllUser/'+ page+'/15/id')
      .subscribe((res:any) => this.datasource.next(res.content));

    return this.datasource;
  }

  // get new applicants
  getNewApplicants() {
    return this._http.get(this._urlNewApplicants);
  }

  // get stages
  getStages() {
    return this._http.get<any>(this._url + '/getAllStage');
  }

  // get streams
  getStreams() {
    return this._http.get<any>(this._url + '/getAllStream');
  }

  // get Status
  getStatuses() {
    return this.statuses;
  }

  // update feedback
  updateFeedback(response: any) {
    return this._http
      .post(this._url + '/updateTracking', response,{responseType:'text'})
      .subscribe((res) => console.log(res));
  }

  // bulk feedback
  bulkFeedback(response: any) {
    return this._http
      .post(this._url + '/BulkUpdateFeedback', response,{responseType:'text'})
      .subscribe((res) => console.log(res));
  }

  // promote applicant
  promoteApplicant(response: any) {
    return this._http
      .post(this._url + '/updateTracking', response,{responseType:'text'})
      .subscribe((res) => console.log(res));
  }

  // bulk Promote
  bulkPromote(response: any) {
    return this._http
      .post(this._url + '/BulkUpdateCreate', response,{responseType:'text'})
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
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return this.errorMessage;
  }

  //  filter
  applyFilter(url: string) {
    console.log(this._filterUrl + url);
    return this._http
      .get(this._filterUrl + url)
      .subscribe((res) => this.datasource.next(res));
  }

  // add to procedure
  addToProcess(response: any) {
    return this._http
      .post(this._url + '/createTracking', response)
      .subscribe((res) => console.log(res));
  }
// searchbar  
  search(url: string) {
    url = url.toLowerCase();
    this._http
      .get(this._url + '/SearchAllUser/' + url)
      .subscribe((res) => this.datasource.next(res));
    return this.datasource;
  }
}
