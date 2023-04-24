import { AfterContentInit, AfterViewInit, Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ApplicantService } from './applicant.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { MatStep, MatStepper } from '@angular/material/stepper';
import { InterviewCycleService } from 'src/app/admin/interview-cycle/services/interview-cycle.service';
import { AuthService } from 'src/app/shared/auth/auth-services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-applicant-dashboard',
  templateUrl: './applicant-dashboard.component.html',
  styleUrls: ['./applicant-dashboard.component.css']
})
export class ApplicantDashboardComponent{
  stages!: any[];
  rounds!: any[];
  showstatus = false;
  noStageName = false;

  @ViewChildren(MatStep)stepper!:QueryList<MatStep>;

  constructor(private http:HttpClient,private applicantService:ApplicantService, private interviewService: InterviewCycleService,private authService: AuthService,private router:Router){
    this.applicantService.getStages().subscribe((data: any) => {
      this.stages = data;
      // for(let stage of this.stages){
      //   if(stage.isActive){
      //     stage++;
      //   }
      // }
    });
    this.showstatus = true;
    
    
  }
  getId(){
    return this.authService.getUserId();
  }
  navigate(){
    this.router.navigate(['/applicant/profile/'+this.getId()]);
  }

  // updateStageStatus(stage: any) {
  //   stage.isActive = stage.isActive === true ? false : true;
  //   this.interviewService
  //     .updateStageStatus(stage.stageId, stage.isActive)
  //     .subscribe((data) => {
  //       console.log(data);
  //     });
  // }

  getRoundOnShowStatus(){
    for(let i=0; i<this.stages.length; i++){
      if(i==0){
        this.applicantService.getRoundsByStage(this.stages[i].stageId).subscribe((rounds: any[]) => {
          this.rounds = rounds;
            console.log(rounds)
        });
      }  
    }
    this.noStageName = true;
    this.showstatus = false;
  }

getRoundsByStage(event: StepperSelectionEvent) {
  this.noStageName = true;
  console.log("Checking");
  for(var stage in this.stages){
    if(event.selectedStep.label==this.stages[stage].stageName && this.stages.indexOf(stage) < 4){
      this.applicantService.getRoundsByStage(this.stages[stage].stageId).subscribe((rounds: any[]) => {
          this.rounds = rounds;
          console.log(rounds)
          console.log(this.stages)
      });
        console.log(this.stages[stage].stageId)
    }
    this.showstatus = false;
  }
}   
}
