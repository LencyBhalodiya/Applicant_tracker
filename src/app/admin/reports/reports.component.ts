import { ReportsService } from './services/reports.service';
import { IApplicants } from './models/applicants';
import { MatSort } from '@angular/material/sort';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/auth/auth-services/auth.service'; 

import html2canvas from 'html2canvas';
import { ElementRef } from '@angular/core'; 
import jsPDF from 'jspdf';
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
    'stream',
    'stage',
    'status',
    // 'action',
  ];
  public Elementdata!: IApplicants[];
  public response!: any;
  public dataSource!: any;
  visibleFlag: boolean = false;
  errorApplicant!: string;
  errorNewApplicant!: string;
  p: number = 0;
  total: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
 
  

  constructor(
    private _aService: ReportsService,
    private _formBuilder: FormBuilder,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  // on init
  ngOnInit() {
    this.getAllApplicants();
  }

  // get all Applicants
  getAllApplicants() {
    this._aService.getData(this.p).subscribe({
      next: (res: any) => {
        this.dataSource = res as IApplicants[];
      },
      error: (err: any) => {
        this.errorApplicant = this._aService.handleError(err);
      },
    });
  }

  // pagination event
  pageChangeEvent(event: number): void {
    this.p = event;
    this.getAllApplicants();
  }

}