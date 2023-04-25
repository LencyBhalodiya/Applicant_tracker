import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth-services/auth.service';

@Component({
  selector: 'app-navbars',
  templateUrl: './navbars.component.html',
  styleUrls: ['./navbars.component.css']
})
export class NavbarsComponent implements OnInit {

  ngOnInit(): void {
      this.getPermission();
  }
  permission = new Set();
constructor(private router: Router,private authService: AuthService,private http: HttpClient) { }
  doLogout() {
    this.authService.logOut();
    }
   getPermission(){
    let getRole = this.authService.getTokenRole()
    let api = this.http.get('http://192.168.102.92:8002/main/api/admin/getPermission/'+ getRole);

    api.subscribe((res)=> {
      let data:any = res;
      for(let i = 0; i < data.length; i++){
        
        this.permission.add(data[i].name);
      }
  
    })                                                                           



  }

}