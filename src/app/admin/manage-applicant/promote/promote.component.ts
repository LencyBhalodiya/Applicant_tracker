import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { ManageApplicantService } from '../services/manage-applicant.service';
import { DatePipe } from '@angular/common';
import { ID,Round,Stage } from '../models/models.interfaces';
import { InterviewCycleService } from '../../interview-cycle/services/interview-cycle.service';

@Component({
  selector: 'app-promote',
  templateUrl: './promote.component.html',
  styleUrls: ['./promote.component.css'],
})
export class PromoteComponent {
  rounds!: Round[];
  statuses!: string[];
  response:any;

  options: string[] = ['Technical Skill', 'Communication Skills', 'Other'];
  stages!: Stage[];
  stageWiseRounds!: string[];

  promotionForm!: FormGroup;
  customReason: boolean = true;
  datePipe = new DatePipe('en-US');
  isFormSubmitted = false;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _aService: ManageApplicantService,
    private iService: InterviewCycleService
  ) {}

  stageChange(value: string) {
    if (this.stages) {
      let index = this.stages.findIndex(
        (stage: any) => stage.stageName === value
      );
      this.rounds = this.stages[index].rounds;
    }
  }

  // on init
  ngOnInit(): void {
    this.promotionForm = this.fb.group({
      stage: new FormControl('', {
        validators: [Validators.required],
      }),
      round: new FormControl('', {
        validators: [Validators.required],
      }),
      start_date: new FormControl(''),
      end_date: new FormControl(''),
      status: new FormControl('Pending'),
    });

    this.iService.getStages().subscribe((stages) => (this.stages = stages));
    this.statuses = this._aService.getStatuses();
  }

  // submit feedback
  submitForm() {
    this.isFormSubmitted=true;
    this.promotionForm.value['end_date'] = this.datePipe.transform(
      new Date(),
      'yyyy/mm/dd hh:mm:ss'
    );
    this.promotionForm.value['start_date'] = this.datePipe.transform(
      new Date(),
      'yyyy/mm/dd hh:mm:ss'
    );
    if (Array.isArray(this.data)) {
      let arr: ID[] = [];
      this.data.forEach((entity) => {
        arr.push({ trackingId: entity.trackingId });
      });
      this.response = {
        ids: arr,
        data: this.promotionForm.value,
      };
      // this._aService.bulkPromote(this.response);
    } else {
      this.response = this.promotionForm.value;
      this.response['tracking'] = {
        tid: this.data.trackingId,
      };
      // this._aService.promoteApplicant(this.response);
    }
    this.promotionForm.reset();
  }
}
