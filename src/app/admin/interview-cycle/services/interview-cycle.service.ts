import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class InterviewCycleService {
  private apiUrl = 'http://192.168.102.92:8002/main/api/admin';
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  getStages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllStage`).pipe(
      // catchError((error) => {
      //   console.error('Error getting stages', error);
      //   return throwError(() => {
      //     error;
      //   });
      // })
    );
  }

  addRoundToSelectedStage(stageId: string, roundName: string): Observable<any> {
    const body = { roundName };
    return this.http.post(`${this.apiUrl}/stage/${stageId}`, body).pipe(
      // catchError((error) => {
      //   console.error('Error adding round to selected stage', error);
      //   return throwError(() => {
      //     this.snackBar.open('Error adding round to selected stage', '', {
      //       duration: 3000,
      //     });
      //   });
      // }),
      map((response) => {
        if (response) {
          this.snackBar.open('Round added successfully!', '', {
            duration: 3000,
          });
        }
        return response;
      })
    );
  }

  addStage(stageName: string): Observable<any> {
    const body = { stageName };
    return this.http.post(`${this.apiUrl}/addStage`, body).pipe(
      // catchError((error) => {
      //   console.error('Error adding new stage', error);
      //   return throwError(() => {
      //     this.snackBar.open('Error adding newstage ', '', {
      //       duration: 3000,
      //     });
      //   });
      // }),
      map((response) => {
        if (response === 200) {
          this.snackBar.open('Round added successfully!', '', {
            duration: 3000,
          });
        }
        return response;
      })
    );
  }

  getRoundsByStage(stageId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllStage`).pipe(
      // catchError((error) => {
      //   console.error('Error getting rounds by stage', error);
      //   return throwError(() => {
      //     this.snackBar.open('Error getting rounds by stage ', '', {
      //       duration: 3000,
      //     });
      //   });
      // }),
      map((data) =>
        data
          .filter((stage) => stage.stageId === stageId)
          .flatMap((stage) =>
            stage.rounds.map(
              (round: {
                roundId: any;
                roundName: any;
                createdTime: any;
                createdBy: any;
              }) => ({
                roundId: round.roundId,
                roundName: round.roundName,
                createdTime: round.createdTime,
                createdBy: round.createdBy,
              })
            )
          )
      )
    );
  }

  updateStageStatus(stageId: any, stageStatus: any): Observable<any> {
    return this.http
      .put(
        `${this.apiUrl}/updateStage/${stageId}`,
        {},
        {
          params: {
            stageId,
            isActive: stageStatus,
          },
        }
      )
      .pipe(
        // catchError((error) => {
        //   console.error('Error updating stage status', error);
        //   return throwError(() => {
        //     this.snackBar.open('Error updating stage status ', '', {
        //       duration: 3000,
        //     });
        //   });
        // })
      );
  }
}
