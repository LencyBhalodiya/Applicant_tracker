import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chart } from 'chart.js';


@Injectable({
  providedIn: 'root'
})
export class DashboardservicesService {


  constructor( private http: HttpClient) {}

  totalApplicantData() {
    return this.http.get('./assets/data/chart.json')    
  }

  createBarChart(id:any,labels:string[], data:number[]) {
     let mybarChart = new Chart(id, {
      type: 'bar',
      data: {
        labels:labels,
        datasets: [
          {
            label: 'Browser',
            backgroundColor: '#6476ed', 
            borderColor: 'transparent',
            borderWidth: 12,
            data: data,
          },
        ],
      },
    });   
  }
  
  

  getPieChartData() {
    return this.http.get('./assets/charts.json')    
  }

  createPieChart(id:any,labels:string[], data:number[]) {
    let oilData: any = {
      labels: labels,
      datasets: [
        {
          data: data, 
          backgroundColor: [
            '#FF6384',
            '#8463FF',  
            '#6384FF',
            '#84FF63',
            '#63FF84',

          ],
        },
      ],
    };

    let options: any = {
      plugins: {
        legend: {
          position: 'right',
        },
      },
    };
    var pieChart = new Chart(id, {
      type: 'pie',
      data: oilData,
      options: options,
    });

  }


}
