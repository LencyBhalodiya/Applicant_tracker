import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { map, Subject } from 'rxjs';
import { DashboardservicesService } from '../services/dashboardservices.service';

@Component({
  selector: 'app-admin-charts',
  templateUrl: './admin-charts.component.html',
  styleUrls: ['./admin-charts.component.css'],
})
export class AdminChartsComponent implements OnInit, OnDestroy {
  constructor(private chartData: DashboardservicesService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.totalApplicantFn();
    this.offerGraphFn();
    this.interviewToRejectionFn();
    this.backoutGraphFn();
  }

  sumData = new Subject<number>();
  totalApplicantFn(): void {
    let labels!: string[];
    let data!: number[];
    this.chartData.totalApplicantData().subscribe((res: any) => {
      labels = Object.keys(res);
      data = Object.values(res);
      this.chartData.sumData.next(data.reduce((a, b) => a + b, 0));
      this.chartData.createBarChart('totalApplicant', labels, data);
    });
  }

  interviewToRejectionFn() {
    let labels!: string[];
    let data!: number[];
    this.chartData.graphLink().subscribe((res: any) => {
      labels = res.streamData.map((item: any) => (labels = item.stream));
      data = res.streamData.map((item: any) => (data = item.rejected));
      this.chartData.createPieChart('rejection', labels, data);
    });
  }

  offerGraphFn() {
    let labels!: string[];
    let data!: number[];
    this.chartData.graphLink().subscribe((res: any) => {
      labels = res.streamData.map((item: any) => (labels = item.stream));
      data = res.streamData.map((item: any) => (data = item.selected));

      this.chartData.createPieChart('offerGraph', labels, data);
    });
  }

  backoutGraphFn(): void {
    let labels!: string[];
    let data!: number[];
    this.chartData.graphLink().subscribe((res: any) => {
      labels = res.streamData.map((item: any) => (labels = item.stream));
      data = res.streamData.map((item: any) => (data = item.BackOut));
      this.chartData.createBarChart('backoutGraph', labels, data);
    });
  }

  ngOnDestroy(): void {
    // this.sumData.unsubscribe();
  }
}
