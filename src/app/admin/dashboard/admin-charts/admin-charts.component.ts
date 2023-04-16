import { Component } from '@angular/core';
import { Chart,registerables } from 'chart.js';
import { map } from 'rxjs';
import { DashboardservicesService } from '../services/dashboardservices.service';

@Component({
  selector: 'app-admin-charts',
  templateUrl: './admin-charts.component.html',
  styleUrls: ['./admin-charts.component.css']
})
export class AdminChartsComponent {
  constructor(private chartData: DashboardservicesService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.totalApplicantFn();
    this.offerGraphFn()
    this.interviewToRejectionFn()
    this.backoutGraphFn();
  }

  totalApplicantFn(): void {
    // let labels!: string[];
    // let data!: number[];
    // this.chartData.totalApplicantData().subscribe((res: any) => console.log(res));
    
      
  }

  interviewToRejectionFn() {

    // let labels!: string[];
    // let data!: number[];
    // this.chartData.totalApplicantData().subscribe((res: any) => {

    //   labels = res.map((item: any) => (labels = item.title));
    //   data = res.map((item: any) => (data = item.total));
 
    //   this.chartData.createPieChart("Rejection",labels, data);
    // });

      }

  offerGraphFn() {

    // let labels!: string[];
    // let data!: number[];
    // this.chartData.totalApplicantData().subscribe((res: any) => {

    //   labels = res.map((item: any) => (labels = item.title));
    //   data = res.map((item: any) => (data = item.total));
 
    //   this.chartData.createPieChart("OfferGraph",labels, data);
    // });

      }

  backoutGraphFn(): void {
    // let labels!: string[];
    // let data!: number[];
    // this.chartData.totalApplicantData().subscribe((res: any) => {

    //   labels = res.map((item: any) => (labels = item.title));
    //   data = res.map((item: any) => (data = item.total));
 
    //   this.chartData.createBarChart("backoutGraph",labels, data);
    // });

  }
}
