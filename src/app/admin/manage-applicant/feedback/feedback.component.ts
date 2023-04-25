import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageApplicantService } from '../services/manage-applicant.service';
import { DatePipe } from '@angular/common';
import { IDs } from '../models/models.interfaces';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent implements OnInit {
  statuses!: string[];
  options = ["Unsatisfactory","Below Expectation","Meets Expectation","Exceeds Expectation","Outstanding"];
  datePipe = new DatePipe('en-US');
  feedbackForm!: FormGroup;
  rejectionHide: boolean = false;
  isSubmitForm=false;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _aService: ManageApplicantService
  ) {}

  // @Output() feedbackEvent = new EventEmitter<any>();

  rejectionToggle(value: string) {
    this.rejectionHide = value === 'Rejected';
  }

  // on init
  ngOnInit(): void {
    console.log("data",this.data);
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
    this.isSubmitForm=true;
    this.feedbackForm.value['end_date'] = this.datePipe.transform(
      new Date(),
      'yyyy/mm/dd hh:mm:ss'
    );

    if (Array.isArray(this.data)) {
      let arr: IDs[] = [];
      this.data.forEach((entity) => {
        arr.push({ id: entity.id, trackingId: entity.trackingId });
      });
      let response = {
        ids: arr,
        data: this.feedbackForm.value,
      };
      this._aService.bulkFeedback(response);
    } else {
      let response = this.feedbackForm.value;
      response['tracking'] = {
        tid: this.data.trackingId,
      };
      response['id'] = this.data.id;
      this._aService.updateFeedback(response);
    }
    this.feedbackForm.reset();
  }
}
