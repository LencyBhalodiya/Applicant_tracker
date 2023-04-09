import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHrComponent } from './add-hr.component';

describe('AddHrComponent', () => {
  let component: AddHrComponent;
  let fixture: ComponentFixture<AddHrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
