// import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { ManageApplicantService } from './services/manage-applicant.service';
import { IApplicants } from './models/applicants';
import { MatSort } from '@angular/material/sort';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { FeedbackComponent } from './feedback/feedback.component';
import { MatDialog } from '@angular/material/dialog';
import { PromoteComponent } from './promote/promote.component';
import { INewApplicants } from './models/newApplicants';
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
  _checkedArr: any[] = [];
  hideBlkBtn: boolean = true;
  visibleFlag: boolean = false;
  newapplicantsFlag: boolean = false;
  btnLabel: string = 'new Applicants';
  errorApplicant!: string;
  errorNewApplicant!: string;
  p: number = 1;
  total: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _aService: ManageApplicantService, private _formBuilder: FormBuilder, private dialog: MatDialog,private authService : AuthService) { }


  // on init
  ngOnInit() {
    this.getAllApplicants();
  }

  // get all Applicants
  getAllApplicants() {
    
    this._aService.getData(this.p).subscribe({
      next: (res: any) => {
      this.dataSource = (res as IApplicants[])
      },
      error: (err: any) => {
        this.errorApplicant = this._aService.handleError(err);
      }
    })

    // const timer = 5;
    // setTimeout(() => {
    //     console.log(new Date());
    //     this.getAllApplicants();
    // }, timer * 1000);
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
    // console.log(this._checkedArr);
  }


  // feedback dialog
  feedbackDialog(userData?: any) {
    if (!userData) {
      userData = { applicantId: this._checkedArr }
    }
    this.dialog.open(FeedbackComponent, {
      panelClass: 'pane', data: userData, width: '40%',
    })
    // location.reload()
  }

  // add to next round 
  nextRound(data: any) {
    this.dialog.open(PromoteComponent, {
      panelClass: 'pane', data: data, width: '40%'
    })
  }

  // schedule dialog 
  // scheduleDialog(userData?: any) {
  //   if (!userData) {
  //     userData = { applicantId: this._checkedArr }
  //   }
  //   this.dialog.open(InterviewScheduleComponent,
  //     {
  //       panelClass: 'pane', data: userData, width: '800px'
  //     })
  // }

  // get new applicants
  getNewApplicants() {
    if (this.newapplicantsFlag == false) {
      this.newapplicantsFlag = true;
      this._aService.getNewApplicants().subscribe({
        next: (res: any) => {
          this.dataSource2 = (res as INewApplicants[])
        },
        error: (err: any) => {
          this.errorNewApplicant = this._aService.handleError(err);
        }
      })
      this.btnLabel = 'old Applicants'
    }
    else {
      this.newapplicantsFlag = false;
      this.getAllApplicants()
      this.btnLabel = 'new Applicants'
    }
  }

  // pagination event
  pageChangeEvent(event: number): void {
    this.p = event;
    this.getAllApplicants();
  }

  // promote single applicant 
  addToProcess(data:any){
    console.log(data);
    let response:any = {};
    response['stage']='Screening Stage';
    response['status']='pending';
    response['round']='Screening Test';
    response['tracking']={
      recruiter : {
        uid:this.authService.getUserId()
      },
      user:{
        uid:data.id
      }
    }
    this._aService.addToProcess(response);
  }

  
}
