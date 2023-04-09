import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IApplicants } from '../models/applicants';
// import { get } from 'http';
// import  '../../assets/data/'
// import { error, log } from 'console';

@Injectable({
  providedIn: 'root'
})
export class ManageApplicantService {
  // private _url:string = "src/assets/data//applicants.json"
  private _url:string = "../../assets/data/applicants.json";
  constructor(private _http:HttpClient) { }

  // getData(): Observable<IApplicants[]>{
  //   return this._http.request(get,this._url).catchError((err: HttpErrorResponse)=>{console.error("error",err.error);
  //   return this._http.request(get,this._url).catchError((err: HttpErrorResponse)=>{console.error("error",err.error);
  //   })
    getData(){
    // return this._http.request(get,this._url).catchError((err: HttpErrorResponse)=>{console.error("error",err.error);
    return this._http.get(this._url);
    }

    deleteApplicant(i:number){
      return this._http.delete<any>("../../assets/data/applicants.json"+i);
    }
  }
