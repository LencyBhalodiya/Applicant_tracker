import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStreamsComponent } from './manage-streams.component';

describe('ManageStreamsComponent', () => {
  let component: ManageStreamsComponent;
  let fixture: ComponentFixture<ManageStreamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageStreamsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageStreamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
