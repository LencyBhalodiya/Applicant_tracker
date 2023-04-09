import { TestBed } from '@angular/core/testing';

import { DashboardservicesService } from './dashboardservices.service';

describe('DashboardservicesService', () => {
  let service: DashboardservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
