import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Stage } from '../interview-cycle.component';
import { InterviewCycleService } from '../services/interview-cycle.service';
@Component({
  selector: 'editstage-dialog',
  templateUrl: './editstage-dialog.html',
  styleUrls: ['./editstage-dialog.css'],
})
export class EditStageDialog {
  stages: Stage[] = [];
  readonly NoWhitespaceRegExp: RegExp = new RegExp('\\S');
  editStage = new FormGroup({
    stagename: new FormControl(
      this.data.stageName,
      Validators.compose([
        Validators.required,
        Validators.pattern(this.NoWhitespaceRegExp),
      ])
    ),
    stagesequence: new FormControl(this.data.sequenceNo, [Validators.required]),
  });
  constructor(
    private interviewService: InterviewCycleService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  editStageDetails() {
    this.interviewService
      .updateStageDetails(
        this.data.stageId,
        this.editStage.value.stagename!,
        this.editStage.value.stagesequence!
      )
      .subscribe((data) => {
        console.log(data);
      });
    this.interviewService.getStages();
  }

  ngOnInit() {}
}
