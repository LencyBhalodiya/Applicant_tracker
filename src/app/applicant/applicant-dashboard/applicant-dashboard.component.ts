import { AfterContentInit, AfterViewInit, Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { MatStep, MatStepper } from '@angular/material/stepper';
import { ApplicantService } from './applicant.service';

@Component({
  selector: 'app-applicant-dashboard',
  templateUrl: './applicant-dashboard.component.html',
  styleUrls: ['./applicant-dashboard.component.css']
})
export class ApplicantDashboardComponent{
  stages!: any[];
  rounds!: any[];
  @ViewChildren(MatStep)stepper!:QueryList<MatStep>;

  constructor(private http:HttpClient,private applicantService:ApplicantService){
    this.applicantService.getStages().subscribe((data: any) => {
      this.stages = data;
    });
    this.applicantService.getRoundsByStage(1).subscribe((rounds: any[]) => {
      this.rounds = rounds;
        console.log(rounds)
    });
  }

getRoundsByStage(event: StepperSelectionEvent) {
  console.log("Checking");
  for(var stage in this.stages){
    if(event.selectedStep.label==this.stages[stage].stageName && this.stages.indexOf(stage) < 4){
      this.applicantService.getRoundsByStage(this.stages[stage].stageId).subscribe((rounds: any[]) => {
          this.rounds = rounds;
          console.log(rounds)
      });
        console.log(this.stages[stage].stageId)
    }
  }
}  
  
}
