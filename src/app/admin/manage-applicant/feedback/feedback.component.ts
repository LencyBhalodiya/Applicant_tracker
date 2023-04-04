import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  rounds:string[] = ["Screening","Online Test","Technical Round 1","Technical Round 2","HR Round"]
  

  
}
