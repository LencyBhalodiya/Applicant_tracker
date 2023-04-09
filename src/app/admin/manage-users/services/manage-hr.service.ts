import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IApplicants } from '../models/applicants';


@Injectable({
  providedIn: 'root'
})
export class ManageHrService {
  private _url:string = "../../assets/data/hr.json  ";
  constructor(private _http:HttpClient) { }


    getData(){
      return this._http.get(this._url);
    }
  }
