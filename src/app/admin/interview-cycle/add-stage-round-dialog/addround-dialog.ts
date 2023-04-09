import { Component, OnInit } from '@angular/core';
import { InterviewCycleService } from '../services/interview-cycle.service';

@Component({
  selector: 'addround-dialog',
  templateUrl: './addround-dialog.html',
  styleUrls: ['./addround-dialog.css'],
})
export class AddRoundDialog implements OnInit {
  rounds!: any[];
  constructor(private interviewService: InterviewCycleService) {}

  ngOnInit() {
    this.interviewService.getRounds().subscribe((data) => {
      this.rounds = data;
    });
  }
}
