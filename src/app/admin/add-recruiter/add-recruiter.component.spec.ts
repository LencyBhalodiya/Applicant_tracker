import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecruiterComponent } from './add-recruiter.component';

describe('AddRecruiterComponent', () => {
  let component: AddRecruiterComponent;
  let fixture: ComponentFixture<AddRecruiterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRecruiterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRecruiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
