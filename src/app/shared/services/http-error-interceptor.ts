import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
constructor(public snackbar:MatSnackBar) { }

intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap(
      event => event instanceof HttpResponse ? 'succeeded' : '',
      // console.log("mt error", err.error.password )
      err => {
        if(err) {
          console.log("------errror ----------",err);
          
          this.snackbar.open(err.error,"ok")
        }
        else if (err.status == 400) {
        this.snackbar.open('user does not exist', "ok");
        }
        else
          this.snackbar.open('Something went wrong', "ok");
      }
    ))
  }
}