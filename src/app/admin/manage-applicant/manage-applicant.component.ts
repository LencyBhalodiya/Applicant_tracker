import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackComponent } from './feedback/feedback.component';
@Component({
  selector: 'app-manage-applicant',
  templateUrl: './manage-applicant.component.html',
  styleUrls: ['./manage-applicant.component.css']
})
export class ManageApplicantComponent {
  numberOfRaw: number[];
  ele !: HTMLCollection;
  visibleFlag: boolean = false;
  hideBlkBtn: boolean = true;
  constructor(public dialog:MatDialog) {
    this.numberOfRaw = Array(10).fill(1);
  }
  ngAfterViewInit() {
    this.ele = document.getElementsByClassName("hide-col");
  }

  bulkFeedback() {
    console.log("ok");
    this.hideBlkBtn = !this.hideBlkBtn;
    if (!this.visibleFlag) {
      for (let i = 0; i < this.ele.length; i++) {
        this.ele[i].classList.add("d-block");
        this.visibleFlag = true;
      }

    } else if (this.visibleFlag) {
      for (let i = 0; i < this.ele.length; i++) {
        this.ele[i].classList.remove("d-block");
        this.ele[i].classList.add("d-none");
        this.visibleFlag = false;
      }
    }
  }

  openDialog() {
    this.dialog.open(FeedbackComponent, {
       panelClass: 'pane', width: '40vw', 
      })
  }
}

