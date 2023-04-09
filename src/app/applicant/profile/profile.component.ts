import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditmodalComponent } from './editmodal/editmodal.component';
console.warn('ProfileComponent');

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(public dialog: MatDialog) {}
  profileData = [
    { title: 'Full Name', value: 'MySelf Saxena' },
    { title: 'Email', value: 'zoro45@gmail.com' },
    { title: 'Phone', value: 99133434343 },
    { title: 'Dirth of Birth', value: '21-11-2000' },
    { title: 'Permanent Address', value: 'Bay Area, San Francisco, CA' },
    {
      title: 'Present Address',
      value: ' pg, Iskon cross road, ahmedbadad pg, Iskon cross road',
    },
    { title: 'Refereal Source', value: 'Alish Methta' },
    { title: 'Gender', value: 'Male' },
  ];
  openDialog() {
    this.dialog.open(EditmodalComponent, {
      data: this.profileData,
      width: '30%',
    });
  }
}
