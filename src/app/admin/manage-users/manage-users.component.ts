import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IApplicants } from '../manage-applicant/models/applicants';
import { AddHrComponent } from './add-hr/add-hr.component';
import { EditHrComponent } from './edit-hr/edit-hr.component';
import { ManageHrService } from './services/manage-hr.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
})
export class ManageUsersComponent {
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
  public dataSource!: MatTableDataSource<IApplicants>;
  public isActive: any;
  public isLoading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  checked: boolean = false;

  id: number = 0;
  constructor(
    private _snackBar: MatSnackBar,
    private manageHrService: ManageHrService,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    this.manageHrService.listen().subscribe((m) => {
      console.log(m);
      this.getAllApplicants();
    });
  }

  changeStatus(data: IApplicants, event: any) {
    console.log(data);

    data.status = data.status === 'Active' ? 'Inactive' : 'Active';
    //console.log('data: ' + data.isActive);
    console.log(event.checked);
    event.checked === false
      ? this.manageHrService.inactiveHr(data.id).subscribe((msg) => {
          console.log('inactive api: ' + data);
        })
      : this.manageHrService.activeHr(data.id).subscribe((msg) => {
          console.log('active api' + data);
        });
    console.log(data);
  }

  getid() {
    return this.id + 1;
  }

  ngOnInit() {
    this.getAllApplicants();
  }

  getAllApplicants() {
    this.isLoading = true;
    this.manageHrService.getAllHrData().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource<IApplicants>(
          res as IApplicants[]
        );
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      },
      error(err) {
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
  }

  print(row: any) {
    console.log(row);
  }
}
