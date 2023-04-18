import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { ManageApplicantService } from '../services/manage-applicant.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-promote',
  templateUrl: './promote.component.html',
  styleUrls: ['./promote.component.css'],
})
export class PromoteComponent {
  rounds: any;
  statuses!: string[];
  options: string[] = ['Technical Skill', 'Communication Skills', 'Other'];
  stages: any;
  stageWiseRounds!: string[];

  feedbackForm!: FormGroup;
  customReason: boolean = true;
  datePipe = new DatePipe('en-US');

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _aService: ManageApplicantService
  ) {}

  // do check
  ngDoCheck() {
    if (this.stages) {
      let index = this.stages.findIndex(
        (stage: any) => stage.stageName === this.feedbackForm.value['stage']
      );
      this.rounds = this.stages[index].rounds;
    }
  }

  // on init
  ngOnInit(): void {
    this.feedbackForm = this.fb.group({
      stage: new FormControl('Screening Stage', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      round: new FormControl('', {
        validators: [Validators.required],
      }),
      start_date: new FormControl(''),
      end_date: new FormControl(''),
      status: new FormControl('pending'),
    });

    this._aService.getStages().subscribe((stages) => (this.stages = stages));
    this.statuses = this._aService.getStatuses();
  }

  // submit feedback
  submitFeedback() {
    let response: any;
    this.feedbackForm.value['end_date'] = this.datePipe.transform(
      new Date(),
      'yyyy/mm/dd hh:mm:ss'
    );
    this.feedbackForm.value['start_date'] = this.datePipe.transform(
      new Date(),
      'yyyy/mm/dd hh:mm:ss'
    );
    if (Array.isArray(this.data)) {
      response = {
        ids: [],
      };
      this.data.forEach((entity) => {
        response.ids.push({ trackingId: entity.trackingId });
      });
      response.data = this.feedbackForm.value;
      this._aService.bulkPromote(response);
    } else {
      response = this.feedbackForm.value;
      response['tracking'] = {
        tid:this.data.trackingId
      };
      this._aService.promoteApplicant(response);
    }
    console.log(response);
    this.feedbackForm.reset();
  }
}
