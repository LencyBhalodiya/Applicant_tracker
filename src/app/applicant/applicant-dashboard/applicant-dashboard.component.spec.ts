import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantDashboardComponent } from './applicant-dashboard.component';

describe('ApplicantDashboardComponent', () => {
  let component: ApplicantDashboardComponent;
  let fixture: ComponentFixture<ApplicantDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicantDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicantDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
