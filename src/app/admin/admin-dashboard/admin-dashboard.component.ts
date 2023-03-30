import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent {
  CardsData = [
    {
      title: 'Total Applicant',
      value: 4532,
      change: `${13}%`,
      icon: 'bi bi-person-fill',
    },
    {
      title: 'Total Succeeded',
      value: 237,
      change: `${23}%`,
      icon: 'bi bi-person-check-fill',
    },
    {
      title: 'Total Rejected',
      value: 2386,
      change: `${53}%`,
      icon: 'bi bi-person-dash-fill',
    },
    {
      title: 'Pending',
      value: 34,
      change: `${3}%`,
      icon: 'bi bi-person-fill-gear',
    },
  ];
}
