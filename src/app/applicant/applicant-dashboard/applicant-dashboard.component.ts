import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth-services/auth.service';

@Component({
  selector: 'app-applicant-dashboard',
  templateUrl: './applicant-dashboard.component.html',
  styleUrls: ['./applicant-dashboard.component.css'],
})
export class ApplicantDashboardComponent {
  constructor(private _authService: AuthService) {}
  getUserId() {
    return this._authService.getUserId();
  }
}
