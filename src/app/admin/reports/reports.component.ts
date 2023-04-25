import { ReportsService } from './services/reports.service';
import { IApplicants } from './models/applicants';
import { MatSort } from '@angular/material/sort';
import {  Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/auth/auth-services/auth.service'; 
import { ManageApplicantService } from '../manage-applicant/services/manage-applicant.service';
import { MatTableDataSource } from '@angular/material/table';


/**
 * @title Table with filtering
 */
@Component({
  selector: 'app-reports',
  styleUrls: ['reports.component.css'],
  templateUrl: 'reports.component.html',
})
export class ReportsComponent {
  displayedColumns: string[] = [
    // 'select',
    'id',
    'name',
    'stage',
    'round',
    'stream',
    'status',
    // 'action',
  ];
  public Elementdata!: IApplicants[];
  public response!: any;
  public dataSource!: MatTableDataSource<any>;
  visibleFlag: boolean = false;
  errorApplicant!: string;
  errorNewApplicant!: string;
  p: number = 1;
  total: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
 
  

  constructor(
    private _aService: ManageApplicantService,
    private _formBuilder: FormBuilder,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getAllApplicants();
  }

  searchEvent(data:any){
    if(data)
      this.dataSource=data;
    else  
      this.getAllApplicants();
  }

  getAllApplicants() {
    this._aService.getData(this.p).subscribe({
      next: (res: any) => {
        this.dataSource = res.content;
      },
      error: (err: any) => {
        // this.errorApplicant = this._aService.handleError(err);
      },
    });
  }

  pageChangeEvent(event: number): void {
    this.p = event;
    this.getAllApplicants();
  }

}