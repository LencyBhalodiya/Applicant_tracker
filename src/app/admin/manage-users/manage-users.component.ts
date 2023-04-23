import { Component, ViewChild } from '@angular/core';
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
import { IApplicants } from './models/applicants';

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
  private _checkedArr: number[] = [];
  public isActive: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  checked: boolean = false;

  constructor(
    private _snackBar: MatSnackBar,
    private manageHrService: ManageHrService,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {}

  changeStatus(data: any, event: any) {
    data.status = data.status === 'Active' ? 'Inactive' : 'Active';
    //console.log('data: ' + data.isActive);
    console.log(event.checked);
    event.checked === false
      ? this.manageHrService.inactiveHr(data.id).subscribe((msg) => {
          console.log('inactive api: ' + data);
        })
      : this.manageHrService.activeHr(data.id).subscribe(
          (msg) => {
            console.log('active api: ' + msg);
          },
          (error) => {
            console.log(error);
          }
        );
    console.log(data);
  }

  ngOnInit() {
    this.getAllApplicants();
  }

  getAllApplicants() {
    this.manageHrService.getData().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.dataSource = new MatTableDataSource<any>(res as IApplicants[]);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error(err) {
        //let snackBarRef = this._snackBar.open('Message archived');
        console.error(err.message);
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
      this.manageHrService.getData();
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
      this.manageHrService.getData();
    });
  }

  print(row: any) {
    console.log(row);
  }
}
