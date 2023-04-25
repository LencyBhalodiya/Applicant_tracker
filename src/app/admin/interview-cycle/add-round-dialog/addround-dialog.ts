import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Stage } from '../interview-cycle.component';
import { InterviewCycleService } from '../services/interview-cycle.service';
@Component({
  selector: 'addround-dialog',
  templateUrl: './addround-dialog.html',
  styleUrls: ['./addround-dialog.css'],
})
export class AddRoundDialog implements OnInit {
  stages: Stage[] = [];
  readonly NoWhitespaceRegExp: RegExp = new RegExp('\\S');
  constructor(private interviewService: InterviewCycleService) {
    this.interviewService.getStages().subscribe((data) => {
      this.stages = data;
    });
  }
  addRound = new FormGroup({
    stagename: new FormControl('', Validators.required),
    stageround: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(this.NoWhitespaceRegExp),
      ])
    ),
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

  ngOnInit() {}
}
