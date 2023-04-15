import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth-services/auth.service';

@Component({
  selector: 'app-navbars',
  templateUrl: './navbars.component.html',
  styleUrls: ['./navbars.component.css']
})
export class NavbarsComponent {
constructor(private router: Router,private authService: AuthService) { }
  doLogout() {
    this.authService.logOut();
    }
  }

