import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endpoints, URL } from "../enum/endpoints.enum";
import { of, throwError } from "rxjs";
import { catchError, finalize, map } from "rxjs/operators";
import {MatSnackBarModule} from '@angular/material/snack-bar';



@Injectable({
  providedIn: 'root'
})
export class RegistrationDataUploadingService {

  constructor(private http: HttpClient, private snackbar:MatSnackBarModule) {}

  getStreams() {
    return this.http.get<any[]>(URL.baseURL + Endpoints.getStreams).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('An error occurred:', error);
        return of([]);
      }),
      finalize(() => {
        console.log('completed');
      })
    );
  }

  submitDetails(addressData: object) {
    return this.http.post(URL.baseURL + Endpoints.addAddress, addressData).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('An error occurred:', error);
        return throwError(error);
      }),
      finalize(() => {
        console.log('completed');
      }),
      map((response: any) => {
        if (response.success) {
          // emit success event
          return response.data;
        } else {
          // emit error event
          throw new Error(response.error);
        }
      })
    );
  }

  submitProfile(profileData: object) {
    return this.http.post(URL.baseURL + Endpoints.addProfileDetails, profileData).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('An error occurred:', error);
        return throwError(error);
      }),
      finalize(() => {
        console.log('Observable completed');
      }),
      map((response: any) => {
        if (response.success) {
          // emit success event
          return response.data;
        } else {
          // emit error event
          throw new Error(response.error);
        }
      })
    );
  }
}