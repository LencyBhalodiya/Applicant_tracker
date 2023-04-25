import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Stage } from '../interview-cycle.component';

@Injectable({
  providedIn: 'root',
})
export class InterviewCycleService {
  private _apiUrl = 'http://192.168.102.92:8002/main/api/admin';
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}
  stages = new BehaviorSubject<Stage[]>([]);

  getStages() {
    this.http
      .get<any[]>(`${this._apiUrl}/getAllStage`)
      .pipe(
        catchError(() => {
          return throwError(() => {
            this.snackBar.open('Error getting stages', '', {
              duration: 3000,
            });
          });
        })
      )
      .subscribe((data: Stage[]) => {
        this.stages.next(data);
      });
    return this.stages;
  }

  addRoundToSelectedStage(stageId: string, roundName: string): Observable<any> {
    const body = { roundName: roundName };
    return this.http.post(`${this._apiUrl}/stage/${stageId}`, body).pipe(
      catchError((error) => {
        console.error('Error adding round to selected stage', error);
        return throwError(() => {
          this.snackBar.open('Error adding round to selected stage', '', {
            duration: 3000,
          });
        });
      }),
      tap((response) => {
        if (response) {
          this.snackBar.open('Round added successfully!', '', {
            duration: 3000,
          });
        }
      })
    );
  }

  addStage(stageName: string): Observable<any> {
    const body = { stageName };
    return this.http.post(`${this._apiUrl}/addStage`, body).pipe(
      catchError((error) => {
        console.error('Error adding new stage', error);
        return throwError(() => {
          this.snackBar.open('Error adding new stage', '', {
            duration: 3000,
          });
        });
      }),
      switchMap((response) => {
        if (response) {
          this.snackBar.open('Stage Added Successfully!', '', {
            duration: 3000,
          });
          return this.getStages();
        }
        return throwError(() => {
          this.snackBar.open('Failed to add stage', '', {
            duration: 3000,
          });
        });
      })
    );
  }

  getRoundsByStage(stageId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this._apiUrl}/getAllStage`).pipe(
      catchError((error) => {
        console.error('Error getting rounds by stage', error);
        return throwError(() => {
          this.snackBar.open('Error getting rounds by stage ', '', {
            duration: 3000,
          });
        });
      }),
      map((data) =>
        data
          .filter((stage) => stage.stageId === stageId)
          .flatMap((stage) =>
            stage.rounds.map(
              (round: {
                roundId: unknown;
                roundName: unknown;
                createdTime: unknown;
                createdBy: unknown;
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

  updateStageStatus(stageId: number, stageStatus: boolean): Observable<any> {
    return this.http
      .put(
        `${this._apiUrl}/updateStageStatus/${stageId}`,
        { responseType: 'application/text' },
        {
          params: {
            stageId,
            isActive: stageStatus,
          },
        }
      )
      .pipe(
        catchError((error) => {
          console.error('Error updating stage status', error);
          return throwError(() => {
            this.snackBar.open('Updated Stage Status Successfully ', '', {
              duration: 3000,
            });
          });
        })
      );
  }
  updateStageDetails(
    stageId: number,
    stageName: string,
    sequenceNo: string
  ): Observable<any> {
    return this.http
      .put(`${this._apiUrl}/updateStage/` + stageId, {
        stageName: stageName,
        sequenceNo: parseInt(sequenceNo),
      })
      .pipe(
        catchError((error) => {
          console.error('Error updating stage details', error);
          return throwError(() => {
            this.snackBar.open('Error updating stage details ', '', {
              duration: 3000,
            });
          });
        }),
        tap((response) => {
          if (response) {
            this.snackBar.open(`Stage Detail's Updated Successfully!`, '', {
              duration: 3000,
            });
          }
        })
      );
  }
}
