import { HttpClient } from '@angular/common/http';
import { compilePipeFromMetadata } from '@angular/compiler';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';

import { ManageStreamsComponent } from './manage-streams.component';
import { ManageStreamService } from './service/manage-stream.service';

describe('ManageStreamsComponent', () => {

  @Component({
    selector:'app-stream',
    template:'<div></div>'
  })
  class FakeStreamComponent {
    @Input() streamData!:{id:number , streamName : string}
  }

  let component: ManageStreamsComponent;
  let fixture: ComponentFixture<ManageStreamsComponent>;
  let service:ManageStreamService
  let manageStreamServiceSpy:jasmine.SpyObj<ManageStreamService>;
  let httpClientSpy:jasmine.SpyObj<HttpClient>;
  let streamData = [
    {
      streamId:1,
      streamName:"Java"
    },
    {
      streamId:2,
      streamName:"Flutter"
    }
  ]

  

  beforeEach(async () => {

   let manageStreamServiceSpyObj=jasmine.createSpyObj("ManageStreamService",['getStreams' , 'setStreams'])
   let httpClientSpyObj=jasmine.createSpyObj("HttpClient",['get','post','delete' , 'put'])

    await TestBed.configureTestingModule({
      declarations: [ ManageStreamsComponent,FakeStreamComponent],
      imports:[MatCardModule,MatIconModule ],
      providers:[
        {
        provide:HttpClient,
        useValue:httpClientSpyObj
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageStreamsComponent);
    manageStreamServiceSpy = TestBed.inject(ManageStreamService) as jasmine.SpyObj<ManageStreamService>
    component = fixture.componentInstance;
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    httpClientSpy.get.and.returnValue(of(streamData));
    manageStreamServiceSpy.getStreams().subscribe({
      next:(posts)=>{
        component.stream=posts
    }
    })
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("addStream()" , ()=>{

    it("add Stream on Call" , ()=>{

      spyOn(component , "addStream")
      httpClientSpy.post.and.returnValue(of(streamData));
      manageStreamServiceSpy.setStreams({streamId:3 , streamName:"SRE"}).subscribe({
      next:(posts)=>{
        streamData=posts
      }
    });
      expect(component.stream.length).toEqual(0)
    })

  })
  
});


