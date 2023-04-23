import { CommonModule, UpperCasePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ManageStreamService } from '../service/manage-stream.service';

import { StreamComponent } from './stream.component';

describe('StreamComponent', () => {
  let component: StreamComponent;
  let service:ManageStreamService
  let serviceSpy: jasmine.SpyObj<ManageStreamService>
  let snackBar : MatSnackBar
  let snackBarSpy : jasmine.SpyObj<MatSnackBar>
  let fixture: ComponentFixture<StreamComponent>;
  
  beforeEach(async () => {

    let snackBarSpyObj = jasmine.createSpyObj("MatSnackBar" , ["openSnackBar"])
    let serviceSpyObj = jasmine.createSpyObj("ManageStreamService" , ["getStreams" ])

    await TestBed.configureTestingModule({
      declarations: [ StreamComponent  ],
      imports:[MatCardModule,MatButtonModule,MatIconModule],
      providers:[
        UpperCasePipe,
        {
        provide:ManageStreamService,
        useValue:serviceSpy
        },
        {
          provide:MatSnackBar,
          useValue:snackBarSpyObj
        }
    ]
    })
    .compileComponents();

  
    fixture = TestBed.createComponent(StreamComponent);
    component = fixture.componentInstance;
    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    component.streamData={streamId:1,streamName:"Data Science"};
    fixture.detectChanges();
    

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("verify data",()=>{
    const data={streamId:1,streamName:"DataScience"}
    component.streamData=data
    fixture.detectChanges();
    const inputElement = fixture.nativeElement;
    const input = inputElement.querySelector('#inputStream');
    console.log(inputElement)
    expect(input?.value).toContain(data.streamName.toUpperCase());
  })
  
});
