import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewCycleComponent } from './interview-cycle.component';

describe('InterviewCycleComponent', () => {
  let component: InterviewCycleComponent;
  let fixture: ComponentFixture<InterviewCycleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterviewCycleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InterviewCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
