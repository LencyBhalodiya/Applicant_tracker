import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHrComponent } from './edit-hr.component';

describe('EditHrComponent', () => {
  let component: EditHrComponent;
  let fixture: ComponentFixture<EditHrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditHrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
