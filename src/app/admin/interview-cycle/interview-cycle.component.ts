import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddRoundDialog } from './add-stage-round-dialog/addround-dialog';
import { InterviewCycleService } from './services/interview-cycle.service';

@Component({
  selector: 'app-interview-cycle',
  templateUrl: './interview-cycle.component.html',
  styleUrls: ['./interview-cycle.component.css'],
})
export class InterviewCycleComponent {
  stages!: any[];
  rounds!: any[];
  constructor(
    public dialog: MatDialog,
    private interviewService: InterviewCycleService
  ) {
    this.interviewService.getStages().subscribe((data) => {
      this.stages = data;
    });
  }
  ngOnInit() {}
  getRoundsByStage(stageId: number) {
    this.interviewService.getRoundsByStage(stageId).subscribe((rounds) => {
      this.rounds = rounds;
    });
  }
  updateStageStatus(stage: any) {
    stage.isActive = stage.isActive === true ? false : true;
    this.interviewService
      .updateStageStatus(stage.stageId, stage.isActive)
      .subscribe((data) => {
        console.log(data);
      });
  }
  openDialog() {
    this.dialog.open(AddRoundDialog);
  }
}
