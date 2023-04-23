import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ManageStreamService } from './manage-stream.service';

describe('ManageStreamService', () => {

  let httpClientSpy:jasmine.SpyObj<HttpClient>;
  let service: ManageStreamService;
  let Stream = [
    {
      streamId:1,
      streamName:"Java"
    },
    {
      streamId:2,
      streamName:"Flutter"
    }
  ]


  beforeEach(() => {
    let httpClientSpyObj=jasmine.createSpyObj("HttpClient",['get','post','delete' , 'put'])
    TestBed.configureTestingModule({
      providers:[
        ManageStreamService,
        {
        provide:HttpClient,
        useValue:httpClientSpyObj
        }
      ]
    });
    service = TestBed.inject(ManageStreamService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe("getStreams()",()=>{

    it("should return stream data when called",()=>{
        httpClientSpy.get.and.returnValue(of(Stream));
        service.getStreams().subscribe({
          next:(posts)=>{
              expect(posts).toEqual(Stream);
          }
        })
        expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    })

  })

  describe("postStream()",()=>{
    it("should add stream when called",()=>{

      const newStream={streamId:3,streamName:"UI"}
      httpClientSpy.post.and.returnValue(of(Stream));
        service.setStreams(newStream).subscribe(
          (res)=> Stream.push(newStream)
          )
        expect(Stream.length).toEqual(3)
        expect(httpClientSpy.post).toHaveBeenCalledTimes(1)
    })
  })

  describe("deleteStream()",()=>{
    it("should delete stream when called",()=>{
        const newStream={streamId:3,streamName:"UI"}
        httpClientSpy.delete.and.returnValue(of(Stream));
        service.deleteStreams(newStream).subscribe()
        expect(Stream.length).toEqual(2)  
    })
  })
  
});
