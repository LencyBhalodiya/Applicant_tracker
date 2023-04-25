import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  private _url: string = 'http://192.168.102.92:8002/main/api/admin';
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
  datasource = new BehaviorSubject<any>({});
  constructor(private _http: HttpClient) {}

  // get all Approved applicants
  getData(page: number) {
    this._http
      .get(this._url + '/getAllUser/'+ page+'/15/id')
      .subscribe((res:any) => this.datasource.next(res.content));

    return this.datasource;
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

  search(url: string) {
    url = url.toLowerCase();
    this._http
      .get(this._url + '/SearchAllUser/' + url)
      .subscribe((res) => this.datasource.next(res));
    return this.datasource;
  }
}
