import { ManageApplicantService } from './services/manage-applicant.service';
import { IApplicants, INewApplicants } from './models/models.interface';
import { Component } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { FeedbackComponent } from './feedback/feedback.component';
import { MatDialog } from '@angular/material/dialog';
import { PromoteComponent } from './promote/promote.component';
import { AuthService } from 'src/app/shared/auth/auth-services/auth.service';

/**
 * @title Table with filtering
 */
@Component({
  selector: 'app-manage-applicant',
  styleUrls: ['manage-applicant.component.css'],
  templateUrl: 'manage-applicant.component.html'
})
export class ManageApplicantComponent {
  displayedColumns: string[] = ['select', 'id', 'name', 'stream', 'stage', 'status', 'action'];
  public Elementdata!: IApplicants[];
  public response!: any;
  public dataSource!: any;
  public dataSource2!: any;
  _checkedArr: string[] = [];
  hideBlkBtn: boolean = true;
  visibleFlag: boolean = false;
  newapplicantsFlag: boolean = false;
  btnLabel: string = 'New Applicants';
  errorApplicant!: string;
  errorNewApplicant!: string;
  p: number = 0;
  total: number = 0;
  constructor(
    private _apiService: ManageApplicantService,
    private dialog: MatDialog,
    private authService: AuthService) { }


  // on init
  ngOnInit() {
    this.getAllApplicants();
  }

  // get all Applicants
  getAllApplicants() {
    this._apiService.getData(this.p).subscribe({
      next: (res: any) => {
        this.dataSource = (res as IApplicants[]);        
      }
    })
  }

  //  checkbox toggle
  toggle(event: MatCheckboxChange) {
    if (event.checked) {
      this._checkedArr.push(event.source.value);
    }
    else if (!event.checked) {
      const index: number = this._checkedArr.indexOf(event.source.value)
      this._checkedArr.splice(index, 1)
    }
  }

  // feedback dialog
  feedbackDialog(userData?: any) {
    if (!userData) {
      userData = { applicantId: this._checkedArr }
    }
    let feedbackDialog = this.dialog.open(FeedbackComponent, {
      panelClass:'pane',
      data: userData,
      width:'40%',
      backdropClass:'back-drop',
      disableClose:true,
    })
    feedbackDialog.afterClosed().subscribe((res)=>this.getAllApplicants());
  }

  // add to next round 
  nextRound(data: any) {
    this.dialog.open(PromoteComponent, {
      panelClass: 'pane', data: data, width: '40%'
    })
  }

  // get new applicants
  getNewApplicants() {
    if (this.newapplicantsFlag == false) {
      this.newapplicantsFlag = true;
      this._apiService.getNewApplicants().subscribe({
        next: (res: any) => {
          this.dataSource2 = (res as INewApplicants[])
        }
      })
      this.btnLabel = 'Old Applicants'
    }
    else {
      this.newapplicantsFlag = false;
      this.getAllApplicants()
      this.btnLabel = 'New Applicants'
    }
  }

  // pagination event
  pageChangeEvent(event: number): void {
    this.p = event;
    this.getAllApplicants();
  }

  // promote single applicant 
  addToProcess(data: any) {
    console.log(data);
    let response: any = {};
    response['stage'] = 'Screening Stage';
    response['status'] = 'pending';
    response['round'] = 'Screening Test';
    response['tracking'] = {
      recruiter: {
        uid: this.authService.getUserId()
      },
      user: {
        uid: data.id
      }
    }
    console.log(response);
    // this._aService.addToProcess(response);
  }
  

}
