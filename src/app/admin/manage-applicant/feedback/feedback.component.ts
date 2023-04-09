import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  rounds: string[] = ["Screening", "Online Apptitude Test", "Technical Interview", "Technical Interview II", "HR Interview"];
  statuses: string[] = ["Selected", "Rejected", "Test Cleared", "On Hold", "Backed-out"];
  options = ["Technical Skill", "Communication Skills", "Other"]

  feedbackForm!: FormGroup;
  rejectionHide: boolean = false;
  customReason: boolean = true;

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  // do check
  ngDoCheck() {
    this.rejectionHide = this.feedbackForm.controls['status'].value === 'Rejected';
  }

  // on init
  ngOnInit(): void {
    this.feedbackForm = this.fb.group(
      {
        round: new FormControl('', { validators: [Validators.required] }),
        status: new FormControl('On Hold',),
        feedback: new FormControl(),
        rejectionReason: new FormControl(''),
      }
    );
    this.customReason = this.feedbackForm.controls['rejectionReason'].value === 'Custom Reason';
  }

  // submit feedback
  submitFeedback(){
    this.feedbackForm.value["applicantId"] = this.data;
    console.log(this.feedbackForm.value);
    this.feedbackForm.reset();
  }

}
