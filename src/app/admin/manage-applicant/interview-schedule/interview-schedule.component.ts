import { Component, Inject, OnInit} from '@angular/core';
import { FormGroup,FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-interview-schedule',
  templateUrl: './interview-schedule.component.html',
  styleUrls: ['./interview-schedule.component.css']
})
export class InterviewScheduleComponent implements OnInit{
  constructor(private fb : FormBuilder,@Inject(MAT_DIALOG_DATA) public data : any){ }

  rounds:string[] = ["Screening","Online Apptitude Test","Technical Interview","Technical Interview II","HR Interview"];

  schedulingForm!:FormGroup;

  // ng on init
  ngOnInit(): void {
    this.schedulingForm=this.fb.group({
      round:new FormControl('',{validators:[Validators.required]}),
      date:new FormControl('',{validators:[Validators.required]}),
      interviewername: new FormControl('',{validators:[Validators.required]}),
      mode:new FormControl('',{validators:[Validators.required]}),
    })
  }

  // schedule interview
  scheduleInterview(): void{
    this.schedulingForm.value["applicantId"] =  this.data;
    console.log(this.schedulingForm.value);
    this.schedulingForm.reset();
  }
}
