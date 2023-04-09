import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import {interview} from '../../../../assets/data/interview-cycle.json';

@Injectable({
  providedIn: 'root',
})
export class InterviewCycleService {
  private apiUrl:string = "../../../../assets/data/interview.json";

  constructor(private http: HttpClient) {}
  getRounds(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((data) =>
        data.map((round) => ({
          roundId: round.roundId,
          roundName: round.roundName,
          createdTime: round.createdTime,
          createdBy: round.createdBy,
          stages: round.stages.map(
            (stage: {
              stageId: any;
              stageName: any;
              createdTime: any;
              createdBy: any;
            }) => ({
              stageId: stage.stageId,
              stageName: stage.stageName,
              createdTime: stage.createdTime,
              createdBy: stage.createdBy,
            })
          ),
        }))
      )
    );
  }
  getStagesByRoundName(roundName: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((data) =>
        data
          .filter((round) => round.roundName === roundName)
          .flatMap((round) =>
            round.stages.map(
              (stage: {
                stageId: any;
                stageName: any;
                createdTime: any;
                createdBy: any;
              }) => ({
                stageId: stage.stageId,
                stageName: stage.stageName,
                createdTime: stage.createdTime,
                createdBy: stage.createdBy,
              })
            )
          )
      )
    );
  }
}
