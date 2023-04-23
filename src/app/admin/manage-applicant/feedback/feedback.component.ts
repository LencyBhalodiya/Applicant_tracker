import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageApplicantService } from '../services/manage-applicant.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent implements OnInit {
  statuses!: string[];
  options = ['Technical Skill', 'Communication Skills', 'Other'];
  datePipe = new DatePipe('en-US');
  feedbackForm!: FormGroup;
  rejectionHide: boolean = false;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _aService: ManageApplicantService
  ) {}

  // do check
  ngDoCheck() {
    this.rejectionHide =
      this.feedbackForm.controls['status'].value === 'Rejected';
  }

  // on init
  ngOnInit(): void {
    this.statuses = this._aService.getStatuses();
    this.feedbackForm = this.fb.group({
      status: new FormControl('Pending', { validators: [Validators.required] }),
      review: new FormControl('', { validators: [Validators.required] }),
      futureRef: new FormControl('false'),
      end_date: new FormControl(''),
    });
    console.log(this.data);
  }

  // submit feedback
  submitFeedback() {
    // let response = this.feedbackForm.value;
    this.feedbackForm.value['end_date'] = this.datePipe.transform(
      new Date(),
      'yyyy/mm/dd hh:mm:ss'
    );
    let response: any;
    if (Array.isArray(this.data)) {
      response = {
        ids: [],
      };

      this.data.forEach((entity) => {
        response.ids.push({ id: entity.id, trackingId: entity.trackingId });
      });

      response.data = this.feedbackForm.value;
      this._aService.bulkFeedback(response);
    } else {
      response = this.feedbackForm.value;
      response['id'] = this.data.id;
      response['tracking'] = {
        tid: this.data.trackingId,
      };
    }
    // console.log('inside submit feedback', response);
    this._aService.updateFeedback(response);
    this.feedbackForm.reset();
  }
}
