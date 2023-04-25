import { ManageApplicantService } from './services/manage-applicant.service';
import {  Component} from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { FeedbackComponent } from './feedback/feedback.component';
import { MatDialog } from '@angular/material/dialog';
import { PromoteComponent } from './promote/promote.component';
import { IApplicants, INewApplicants } from './models/models.interfaces';
import { AuthService } from 'src/app/shared/auth/auth-services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fromEvent } from 'rxjs';

/**
 * @title Table with filtering
 */
@Component({
  selector: 'app-manage-applicant',
  styleUrls: ['manage-applicant.component.css'],
  templateUrl: 'manage-applicant.component.html',
})
export class ManageApplicantComponent {
  displayedColumns: string[] = [
    'select',
    'id',
    'name',
    'stream',
    'stage',
    'status',
    'action',
  ];
  isLoading:boolean=true;
  public Elementdata!: IApplicants[];
  public dataSource: any=[];
  public dataSource2: any=[];
  _checkedArr: string[] = [];
  visibleFlag: boolean = false;
  newapplicantsFlag: boolean = false;
  btnLabel: string = 'Fresh Applicants';
  p: number = 1;
  total: number = 0;
 
  constructor(
    private _aService: ManageApplicantService,
    private dialog: MatDialog,
    private authService: AuthService,
    private snackbar:MatSnackBar
  ) {}

  // on init
  ngOnInit() {
    this.getAllApplicants();
  }

  // get all Applicants
  getAllApplicants() {
    this._aService.getData(this.p).subscribe({
      next: (res: any) => {
          this.dataSource = res.content as IApplicants[];
          this.total = res.totalElements
        this.isLoading=false;
      },
      error: (err: any) => {
        console.log(err);
        this.snackbar.open("Something Went Wrong...",'',{duration:2000});
      },
    });
  }

  //  checkbox toggle
  toggle(event: MatCheckboxChange) {
    if (event.checked) {
      this._checkedArr.push(event.source.value);
    } else if (!event.checked) {
      const index: number = this._checkedArr.indexOf(event.source.value);
      this._checkedArr.splice(index, 1);
    }
  }

  // feedback dialog
  feedbackDialog(userData?: any) {
    if (!userData) {
      userData = { applicantId: this._checkedArr };
    }
    let feedbackdialog = this.dialog.open(FeedbackComponent, {
      panelClass: 'pane',
      data: userData,
      width: '40%',
      backdropClass:'back-drop',
      disableClose:true
    });
    feedbackdialog.afterClosed().subscribe((res)=>{
      this.getAllApplicants();
      this._checkedArr = [];
      if(feedbackdialog.componentInstance.isSubmitForm){
        this.getAllApplicants();
        feedbackdialog.componentInstance.isSubmitForm=false;
      }
    });
  }

  // add to next round
  nextRound(data: any) {
    let promotionDialog = this.dialog.open(PromoteComponent, {
      panelClass: 'pane',
      data: data,
      width: '40%',
      backdropClass:'back-drop',
      disableClose:true
    });

    promotionDialog.afterClosed().subscribe((res)=>{
      this.getAllApplicants();
      this._checkedArr=[];
      if(promotionDialog.componentInstance.isFormSubmitted){
        this.getAllApplicants();
        promotionDialog.componentInstance.isFormSubmitted=false;
      }
    });
  }

  search(data:any){
    if(data)
    this.dataSource=data;
    else
      this.getAllApplicants();
  }

  // get new applicants
  getNewApplicants() {
    if (this.newapplicantsFlag == false) {
      this.newapplicantsFlag = true;
      this._aService.getNewApplicants().subscribe({
        next: (res) => {
          this.dataSource2 = res as INewApplicants[];
        },
        error: (err) => {
          console.log(err);
          this.snackbar.open('Something Went Wrong','ok',{duration:2000});
        },
      });
      this.btnLabel = 'Active Applicants';
    } else {
      this.newapplicantsFlag = false;
      this.getAllApplicants();
      this.btnLabel = 'Fresh Applicants';
    }
  }

  // pagination event
  pageChangeEvent(event: number): void {
    this.p = event;
    console.log(event);
    this.getAllApplicants();
  }

  // promote single applicant
  addToProcess(data:INewApplicants) {
    let response: any = {};
    response['stage'] = 'Screening Stage';
    response['status'] = 'Pending';
    response['round'] = 'Screening Test';
    response['tracking'] = {
      recruiter: {
        uid: this.authService.getUserId(),
      },
      user: {
        uid: data.id,
      },
    };
    this._aService.addToProcess(response).subscribe(res=>this.getAllApplicants())
    this.getNewApplicants();
  }
}
