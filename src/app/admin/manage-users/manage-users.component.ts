import { Component, DoCheck, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddHrComponent } from './add-hr/add-hr.component';
import { EditHrComponent } from './edit-hr/edit-hr.component';
import { ManageHrService } from './services/manage-hr.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { IApplicants } from './models/applicants';
import { AuthService } from 'src/app/shared/auth/auth-services/auth.service';
import { ApplicantService } from 'src/app/applicant/applicant-dashboard/applicant.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
})
export class ManageUsersComponent {
  isLoading: boolean = true;

  displayedColumns: string[] = [
    'id',
    'fname',
    'lname',
    'email',
    'role',
    'status',
    'action',
  ];
  public Elementdata!: IApplicants[];
  public response!: any;
  public dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  checked: boolean = false;



  constructor(
    private _snackBar: MatSnackBar,
    private manageHrService: ManageHrService,
    public dialog: MatDialog,
  ) {}

  changeStatus(id: number, status: string, event: MatSlideToggleChange) {

    status = status === 'Active' ? 'Inactive' : 'Active';
    console.log(event.checked);
    event.checked === false
      ? this.manageHrService.inactiveHr(id).subscribe({
          next: (msg) => console.log(msg),
          error: (error) => console.log(error),
        })
      : this.manageHrService.activeHr(id).subscribe({
          next: (msg) => console.log(msg),
          error: (error) => console.log(error),
        });
    console.log(id, status);
  }

  ngOnInit() {
    this.getAllApplicants();    
  }

  getAllApplicants() {
    console.log("get all applicants")
    this.manageHrService.getData().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.dataSource = new MatTableDataSource<any>(res as IApplicants[]);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        console.log('error');

        this._snackBar.open('something went wrong', 'ok', { duration: 2000 });
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string) {
    const dialogRef = this.dialog.open(AddHrComponent, {
      width: '550px',
      disableClose: true,
      panelClass: 'my-custom-container',
      backdropClass: 'bdrop',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe((res) => {
      console.log("after closed");
      // this.getAllApplicants();
      let component = dialogRef.componentInstance;
      this.manageHrService.addhr(component.response).subscribe((res)=>this.getAllApplicants());
    });
  }

  openDialogEdit(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    row: any
  ) {
    const dialogRef = this.dialog.open(EditHrComponent, {
      width: '550px',
      disableClose: true,
      data: row,
      panelClass: 'my-custom-container',
      backdropClass: 'bdrop',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe((res) => {
      this.getAllApplicants();
    });
  }

  print(row: any) {
    console.log(row);
  }
}
