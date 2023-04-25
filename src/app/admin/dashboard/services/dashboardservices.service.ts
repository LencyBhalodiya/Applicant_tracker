import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chart } from 'chart.js';
import {  Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DashboardservicesService {


  constructor( private http: HttpClient) {}
 private totalApplicanturl  = 'http://192.168.102.92:8002/main/api/admin/stream-count';
 private  graphUrl = 'http://192.168.102.92:8002/main/api/admin/candidatesSelectionToRejection'
  sumData = new Subject<number>();
  
 totalApplicantData() {
    return this.http.get(this.totalApplicanturl)
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
  
  
  graphLink()
  {
     return this.http.get(this.graphUrl);
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
            'lightblue',

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
