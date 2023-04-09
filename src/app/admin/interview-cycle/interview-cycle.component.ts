import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddRoundDialog } from './add-stage-round-dialog/addround-dialog';
import { InterviewCycleService } from './services/interview-cycle.service';

@Component({
  selector: 'app-interview-cycle',
  templateUrl: './interview-cycle.component.html',
  styleUrls: ['./interview-cycle.component.css']
})
export class InterviewCycleComponent {
  rounds!: any[];
  stages!: any[];
  constructor(
    public dialog: MatDialog,
    private interviewService: InterviewCycleService
  ) {}
  ngOnInit() {
    this.interviewService.getRounds().subscribe((data) => {
      this.rounds = data;
    });
  }
  getStages(roundName: string) {
    this.interviewService
      .getStagesByRoundName(roundName)
      .subscribe((stages) => {
        this.stages = stages;
      });
  }
  openDialog() {
    const dialogRef = this.dialog.open(AddRoundDialog);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
