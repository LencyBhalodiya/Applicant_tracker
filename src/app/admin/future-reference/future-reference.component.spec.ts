import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureReferenceComponent } from './future-reference.component';

describe('FutureReferenceComponent', () => {
  let component: FutureReferenceComponent;
  let fixture: ComponentFixture<FutureReferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FutureReferenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FutureReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
