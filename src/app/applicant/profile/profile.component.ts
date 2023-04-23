import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
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
    private _authService: AuthService,
    private _activatedRoute: ActivatedRoute
  ) {}
  private _userId!: string;
  profileData: any;
  profileAddressData: any;

  openDialog() {
    this.dialog.open(EditmodalComponent, {
      data: this.profileData,
      width: '30%',
    });
  }
  ngOnInit() {
    this._userId = this._activatedRoute.snapshot.params['id'];
    this.getUserInfo();

    this.getUserAddress();
  }
  getUserInfo() {
    this._profileService.getProfileData(this._userId).subscribe((res) => {
      this.profileData = res;
      console.log('ddd' + res);
    });
  }

  getUserAddress() {
    this._profileService.getUserAddress(this._userId).subscribe((res) => {
      this.profileAddressData = res;
      console.log(res);

      //console.log(this.profileData);
    });
  }

  doLogout() {
    this.authService.logOut();
  }
}
