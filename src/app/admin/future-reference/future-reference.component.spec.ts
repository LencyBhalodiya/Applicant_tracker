import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialDesignModule } from 'src/app/shared/material-design/material-design.module';

import { FutureReferenceComponent } from './future-reference.component';

describe('FutureReferenceComponent', () => {
  let component: FutureReferenceComponent;
  let fixture: ComponentFixture<FutureReferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FutureReferenceComponent ],
      imports : [ MaterialDesignModule , BrowserAnimationsModule ]
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
