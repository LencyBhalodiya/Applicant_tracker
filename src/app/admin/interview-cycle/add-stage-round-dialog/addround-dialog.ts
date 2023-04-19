import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InterviewCycleService } from '../services/interview-cycle.service';
@Component({
  selector: 'addround-dialog',
  templateUrl: './addround-dialog.html',
  styleUrls: ['./addround-dialog.css'],
})
export class AddRoundDialog implements OnInit {
  stages!: any[];
  fields: any[] = [];
  constructor(private interviewService: InterviewCycleService) {}
  addRound = new FormGroup({
    stagename: new FormControl('', Validators.required),
    stageround: new FormControl('', Validators.required),
  });
  addStage = new FormGroup({
    stagename: new FormControl('', [Validators.required]),
  });

  addRoundToSelectedStage() {
    this.interviewService
      .addRoundToSelectedStage(
        this.addRound.value.stagename!,
        this.addRound.value.stageround!
      )
      .subscribe((data) => {
        console.log(data);
      });
  }
  changeStageStatus() {
    this.interviewService
      .addStage(this.addStage.value.stagename!)
      .subscribe((data) => {
        console.log(data);
      });
  }
  addNewStage() {
    this.interviewService
      .addStage(this.addStage.value.stagename!)
      .subscribe((data) => {
        console.log(data);
      });
  }
  ngOnInit() {
    this.interviewService.getStages().subscribe((data) => {
      this.stages = data;
    });
  }
}
