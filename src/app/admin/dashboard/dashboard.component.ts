import { Component, OnInit } from '@angular/core';
import { DashboardservicesService } from './services/dashboardservices.service';

interface graphData {
  total: number;
  selected: number;
  rejected: number;
  backOut: number;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  constructor(private dashboardData: DashboardservicesService) {}

  ngOnInit(): void {
    this.getGraphData();
  }
  sumArray : graphData = {total: 11 , selected: 11 , rejected: 11 , backOut: 11};
 
  getGraphData (){
    this.dashboardData.graphLink().subscribe((res:any) => {
      this.sumArray.selected = res.offered;
      this.sumArray.rejected = res.rejected;
      this.sumArray.backOut = res.BackedOut;
    });
  }

}
