import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageApplicantComponent } from './manage-applicant.component';

describe('ManageApplicantComponent', () => {
  let component: ManageApplicantComponent;
  let fixture: ComponentFixture<ManageApplicantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageApplicantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageApplicantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
