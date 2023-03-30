import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
@Component({
  selector: 'app-admin-charts',
  templateUrl: './admin-charts.component.html',
  styleUrls: ['./admin-charts.component.css'],
})
export class AdminChartsComponent implements AfterViewInit {
  ctxLine: any;
  lineCanvas: any;

  @ViewChild('lineChart') lineChart!: { nativeElement: any };

  constructor() {
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    this.lineChartBrowser();
    this.barChartBrowser();
    this.pieChart();
    this.barChart();
  }

  //barchart
  barCanvas: any;
  barCtx: any;
  @ViewChild('barChart') BarChart!: { nativeElement: any };

  barChartBrowser(): void {
    this.barCanvas = this.BarChart.nativeElement;
    this.barCtx = this.barCanvas.getContext('2d');

    var mybarChart = new Chart(this.barCtx, {
      type: 'bar',
      data: {
        datasets: [
          {
            backgroundColor: '#6476ed', // Set a single color for all bars
            borderColor: 'transparent',
            borderWidth: 12,
            data: [
              { x: 'UI Itern', y: 30 },
              { x: 'Java', y: 14 },
              { x: 'QA tester', y: 24 },
              { x: 'DevOps', y: 7 },
              { x: 'Flutter', y: 11 },
            ],
          },
        ],
      },
      
    });
  }
  //lineChart

  lineChartBrowser(): void {
    this.lineCanvas = this.lineChart.nativeElement;
    this.ctxLine = this.lineCanvas.getContext('2d');

    let data: any = {
      datasets: [
        {
          label: 'Interviewed',
          data: [
            {
              x: 0,
              y: 113,
              labelText: '01/12/2022',
            },
            {
              x: 1,
              y: 10,
              labelText: '02/12/2022',
            },
            {
              x: 2,
              y: 5,
              labelText: '03/12/2022',
            },
            {
              x: 3,
              y: 40,
              labelText: '03/12/2022',
            },
          ],
          fill: false,
          showLine: true,
          borderColor: '#A2E4B8',
          backgroundColor: '#2FF924',
          pointRadius: 0,
          cubicInterpolationMode: 'monotone',
        },
        {
          label: 'Rejection',
          data: [
            {
              x: 0,
              y: 25,
              labelText: '01/11/2022',
            },
            {
              x: 1,
              y: 49,
              labelText: '02/11/2022',
            },
            {
              x: 2,
              y: 15,
              labelText: '03/11/2022',
            },
            {
              x: 3,
              y: 130,
              labelText: '03/11/2022',
            },
          ],
          fill: false,
          showLine: true,
          borderColor: '#FF6D6A',
          backgroundColor: '#CD001A',
          pointRadius: 0,
          cubicInterpolationMode: 'monotone',
        },
      ],
    };

    let options: any = {
      interaction: {
        intersect: false,
        mode: 'index',
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (ctxLine: any) {
              let lab =
                ctxLine.dataset.label +
                ': ' +
                ctxLine.dataset.data[ctxLine.dataIndex].labelText +
                ' ~ ' +
                ctxLine.dataset.data[ctxLine.dataIndex].y;
              return lab;
            },
            title: function (ctxLine: any) {
              return 'Ratio';
            },
          },
        },
      },
    };

    var mybarChart = new Chart(this.ctxLine, {
      type: 'scatter',
      data: data,
      options: options,
    });
  }

  // pie chart

  canvasPie: any;
  ctxPie: any;

  @ViewChild('oilChart') oilChart!: { nativeElement: any };
  pieChart() {
    let oilData: any = {
      labels: ['Java', 'UI', 'QA', 'Devops', 'Flutter'],
      datasets: [
        {
          data: [133, 86, 52, 51, 50],
          backgroundColor: [
            '#FF6384',
            '#63FF84',
            '#84FF63',
            '#8463FF',
            '#6384FF',
          ],
        },
      ],
    };

    let options: any = {
      plugins: {
        legend:{
          position: 'right'
        }
      }
    };
    this.canvasPie = this.oilChart.nativeElement;
    var pieChart = new Chart(this.canvasPie, {
      type: 'pie',
      data: oilData,
      options: options,
    });
  }

  //backout graph

  //barchart
  barCanvasTwo: any;
  barCtxTwo: any;
  @ViewChild('barChartTwo') barChartTwo!: { nativeElement: any };

  barChart(): void {
    this.barCanvasTwo = this.barChartTwo.nativeElement;
    this.barCtxTwo = this.barCanvasTwo.getContext('2d');

    var mybarChart = new Chart(this.barCtxTwo, {
      type: 'bar',
      data: {
        datasets: [
          {
            backgroundColor: '#6476ed', // Set a single color for all bars
            borderColor: 'transparent',
            borderWidth: 12,
            data: [
              { x: 'UI Itern', y: 30 },
              { x: 'Java', y: 14 },
              { x: 'QA tester', y: 24 },
              { x: 'DevOps', y: 4 },
              { x: 'Flutter', y: 11 },
            ],
          },
        ],
      },
    });
  }
}
