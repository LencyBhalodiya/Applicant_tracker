import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { ManageApplicantService } from './services/manage-applicant.service';
import { IApplicants } from './models/applicants';
import { MatSort } from '@angular/material/sort';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { FeedbackComponent } from './feedback/feedback.component';
import { InterviewScheduleComponent } from './interview-schedule/interview-schedule.component';
import { MatDialog } from '@angular/material/dialog';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

/**
 * @title Table with filtering
 */
@Component({
  selector: 'app-manage-applicant',
  styleUrls: ['manage-applicant.component.css'],
  templateUrl: 'manage-applicant.component.html',
})
export class ManageApplicantComponent {
  displayedColumns: string[] = ['select', 'id', 'name', 'stream', 'stage', 'status', 'action'];
  public Elementdata!: IApplicants[];
  public response!: any;
  public dataSource!: MatTableDataSource<any>;
  private _checkedArr: number[] = [];
  hideBlkBtn: boolean = true;
  visibleFlag: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _aService: ManageApplicantService, private _formBuilder: FormBuilder, private dialog:MatDialog) { }


  toppings = this._formBuilder.group({
    pepperoni: false,
    extracheese: false,
    mushroom: false,
  });


  ngOnInit() {
    this.getAllApplicants();
  }

  getAllApplicants() {
    this._aService.getData().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource<any>(res as IApplicants[])
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err: any) => {
        console.error(err);
      }
    })
  }

  //  checkbox toggle
  toggle(event: MatCheckboxChange) {
    if (event.checked) {
      this._checkedArr.push(parseInt(event.source.value))
    }
    else if (!event.checked) {
      const index: number = this._checkedArr.indexOf(parseInt(event.source.value))
      this._checkedArr.splice(index, 1)
    }
    console.log(this._checkedArr);
  }


  // feedback dialog
  openDialog(userData?: any) {
    if (!userData) {
      userData = {applicantId:this._checkedArr}
    }
    this.dialog.open(FeedbackComponent, {
      panelClass: 'pane', data: userData, width: '800px'
    })
  }
  
  // schedule dialog 
  scheduleDialog(userData?: any) {
    if (!userData) {
      userData = {applicantId:this._checkedArr}
    }
    this.dialog.open(InterviewScheduleComponent,
      {
        panelClass: 'pane', data: userData, width: '800px'
      })
  }
}
