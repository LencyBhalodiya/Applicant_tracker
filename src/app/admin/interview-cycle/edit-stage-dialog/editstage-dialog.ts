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
  constructor(
    private interviewService: InterviewCycleService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  editStage = new FormGroup({
    stagename: new FormControl('', Validators.required),
    stageround: new FormControl('', Validators.required),
  });

  editStageDetails() {
    this.interviewService
      .updateStageDetails(
        this.data.stageId,
        this.editStage.value.stagename!,
        this.editStage.value.stageround!
      )
      .subscribe((data) => {
        console.log(data);
      });
    this.interviewService.getStages();
  }

  ngOnInit() {}
}
