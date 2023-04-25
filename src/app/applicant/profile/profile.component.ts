import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../profile-service/profile.service';
import { EditmodalComponent } from './editmodal/editmodal.component';
import { ResumeComponent } from './resume/resume.component';
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
  public currentAdd!: string;
  public permAdd!: string;
  public imgUrl!: string;
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
    this.getImage();
  }
  getUserInfo() {
    this._profileService.getProfileData(this._userId).subscribe((res) => {
      this.profileData = res;
    });
  }

  getUserAddress() {
    this._profileService.getUserAddress(this._userId).subscribe((res) => {
      this.profileAddressData = res;
      if (this.profileAddressData[0].addressType == "permenant residence's") {
        this.permAdd =
          this.profileAddressData[0].street +
          ', ' +
          this.profileAddressData[0].city +
          ', ' +
          this.profileAddressData[0].state;
      }
      this.currentAdd =
        this.profileAddressData[0].street +
        ', ' +
        this.profileAddressData[0].city +
        ', ' +
        this.profileAddressData[0].state;

      //console.log('data' + this.currentAdd);

      console.log(res);
    });
  }
  openPdfViewer() {
    const dialogRef = this.dialog.open(ResumeComponent, {
      data: {
        id: this._userId,
      },
      width: '600px',
      height: '800px',
    });
  }
  getImage() {
    this._profileService.getImage(this._userId).subscribe((url) => {
      const file = new Blob([url], { type: 'image/jpeg' });
      this.imgUrl = URL.createObjectURL(file);
    });
  }
  doLogout() {
    this.authService.logOut();
  }

  getRole() {
    let role = this.authService.getTokenRole();
    return role == 'user' ? true : false;
  }
}
