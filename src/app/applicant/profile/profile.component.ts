import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProfileService } from '../profile-service/profile.service';
import { EditmodalComponent } from './editmodal/editmodal.component';
import { AuthService } from 'src/app/shared/auth/auth-services/auth.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private authService: AuthService,
    private _profileService: ProfileService,
    private _authService: AuthService
  ) {}
  profile: any;
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
  ngOnInit() {
    this.getUserInfo();
  }
  getUserInfo() {
    this._profileService
      .getProfileData(this._authService.getUserId())
      .subscribe((res) => {
        this.profile = res;
        console.log(res);
      });
  }
  doLogout() {
    this.authService.logOut();
  }
}
