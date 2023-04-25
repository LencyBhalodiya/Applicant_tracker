import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddStageDialog } from './add-stage-dialog/addstage-dialog';
import { AddRoundDialog } from './add-round-dialog/addround-dialog';
import { EditStageDialog } from './edit-stage-dialog/editstage-dialog';
import { InterviewCycleService } from './services/interview-cycle.service';

@Component({
  selector: 'app-interview-cycle',
  templateUrl: './interview-cycle.component.html',
  styleUrls: ['./interview-cycle.component.css'],
})
export class InterviewCycleComponent {
  stages: Stage[] = [];
  rounds: Round[] = [];
  constructor(
    public dialog: MatDialog,
    private interviewService: InterviewCycleService
  ) {
    this.interviewService.getStages().subscribe((stages: Stage[]) => {
      this.stages = stages;
    });
  }
  ngOnInit() {}

  getRoundsByStage(stageId: number) {
    this.interviewService
      .getRoundsByStage(stageId)
      .subscribe((round: Round[]) => {
        this.rounds = round;
      });
  }

  updateStageStatus(stage: Stage) {
    stage.isActive = !stage.isActive;
    this.interviewService
      .updateStageStatus(stage.stageId, stage.isActive)
      .subscribe((data) => {
        console.log(data);
      });
  }

  openStageDialog() {
    this.dialog.open(AddStageDialog, {
      width: '600px',
      height: '400px',
    });
  }
  openRoundDialog() {
    let dialogRef = this.dialog.open(AddRoundDialog, {
      width: '600px',
      height: '400px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.interviewService.getStages();
    });
  }
  openEditStageDialog(stageId: number, stageName: string, sequenceNo: number) {
    this.dialog.open(EditStageDialog, {
      width: '600px',
      height: '400px',
      data: { stageId: stageId, stageName: stageName, sequenceNo: sequenceNo },
    });
  }
}

export interface Stage {
  stageId: number;
  stageName: string;
  createdTime: string;
  createdBy: string;
  isActive: boolean;
  sequenceNo: number;
  rounds: Round[];
}

export interface Round {
  roundId: number;
  roundName: string;
  createdTime: string;
  createdBy: string;
}
