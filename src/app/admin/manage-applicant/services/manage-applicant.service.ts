import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  BulkUpdateCreateForm,
  BulkUpdateFeedbackForm,
  PromoteForm,
  Stage,
  UpdateFeedbackForm,
} from '../models/models.interfaces';
@Injectable({
  providedIn: 'root',
})
export class ManageApplicantService {
  private _url: string = 'http://192.168.102.92:8002/main/api/admin';
  private _urlNewApplicants: string =
    'http://192.168.102.92:8002/main/api/admin/getNewUser';
  private _filterUrl = 'http://192.168.102.92:8002/main/api/admin';

  statuses: string[] = [
    'Offered',
    'Rejected',
    'Test Cleared',
    'Pending',
    'On Hold',
    'BackedOut',
  ];

  rounds!: string[];
  errorMessage!: string;
  constructor(private _http: HttpClient, private snackbar: MatSnackBar) {}

  // get all Approved applicants
  getData(page: number) {
    return this._http
      .get(this._url + `/getAllUser/${page-1}/10/id`)
  }

  // get new applicants
  getNewApplicants() {
    return this._http.get(this._urlNewApplicants);
  }
  // get streams
  getStreams() {
    return this._http.get(this._url + '/getAllStream');
  }

  // get Status
  getStatuses() {
    return this.statuses;
  }

  // update feedback
  updateFeedback(response: UpdateFeedbackForm) {
    return this._http
      .put(this._url + '/updateUserTracking', response)
      .pipe(
        catchError((error) => {
          console.log('Error while giving feedback', error);
          return throwError(() => {
            this.snackbar.open('Something Went Wrong...', '', {
              duration: 2000,
            });
          });
        })
      )
      // .subscribe((res) => console.log(res));
  }

  // bulk feedback
  bulkFeedback(response: BulkUpdateFeedbackForm) {
    return this._http
      .post(this._url + '/BulkUpdateFeedback', response)
      .pipe(
        catchError((error) => {
          console.log('Error in bulkReview', error);
          return throwError(() => {
            this.snackbar.open('Something Went Wrong..', '', {
              duration: 2000,
            });
          });
        })
      )
      // .subscribe((res) => console.log(res));
  }

  // promote applicant
  promoteApplicant(response: PromoteForm) {
    return this._http
      .put(this._url + '/updateUserTracking', response)
      .pipe(
        catchError((error) => {
          console.log('Error in promoting...', error);
          return throwError(() => {
            this.snackbar.open('Something went wrong...', '', {
              duration: 2000,
            });
          });
        })
      )
      // .subscribe((res) => console.log(res));
  }

  // bulk Promote
  bulkPromote(response: BulkUpdateCreateForm) {
    return this._http
      .post<any>(this._url + '/BulkUpdateCreate', response)
      .pipe(
        catchError((error) => {
          console.log('error in bulk promotion', error);
          return throwError(() => {
            this.snackbar.open('Something Went Wrong', '', { duration: 2000 });
          });
        })
      )
      // .subscribe((res) => console.log(res));
  }

 

  //  filter
  applyFilter(url: string) {
    console.log(this._filterUrl + url);
    return this._http
      .get(this._filterUrl + url)
      .pipe(
        catchError((error) => {
          console.log('error in filtering', error);
          return throwError(() => {
            this.snackbar.open('Something Went Wrong...', '', {
              duration: 2000,
            });
          });
        })
      );
  }

  // add to procedure
  addToProcess(response: PromoteForm) {
    return this._http
      .post(this._url + '/createUserTracking', response)
      .pipe(
        catchError((error) => {
          console.log('Error occured while adding to process', error);
          return throwError(() => {
            this.snackbar.open('Something Went Wrong...', '', {
              duration: 2000,
            });
          });
        })
      )
  }

  search(url: string) {
    url = url.toLowerCase();
    return this._http
      .get(this._url + '/SearchAllUser/' + url)
  }
}
