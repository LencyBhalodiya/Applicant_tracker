import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Stage } from '../interview-cycle.component';
import { InterviewCycleService } from '../services/interview-cycle.service';
@Component({
  selector: 'addstage-dialog',
  templateUrl: './addstage-dialog.html',
  styleUrls: ['./addstage-dialog.css'],
})
export class AddStageDialog {
  stages: Stage[] = [];
  readonly NoWhitespaceRegExp: RegExp = new RegExp('\\S');
  addStage = new FormGroup({
    stagename: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(this.NoWhitespaceRegExp),
      ])
    ),
  });
  constructor(private interviewService: InterviewCycleService) {
    this.interviewService.getStages().subscribe((data) => {
      this.stages = data;
    });
  }
  addNewStage() {
    this.interviewService
      .addStage(this.addStage.value.stagename!)
      .subscribe((data) => {
        console.log(data);
      });
    this.interviewService.getStages();
  }
}
