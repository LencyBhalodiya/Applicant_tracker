import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PassDataService } from './pass-data.service';


describe('PassDataService', () => {
  let service: PassDataService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let Permission = [
    {
      id:1,
      roleName:"report"
    },
    {
      id:2,
      roleName:"dashboard"
    }
  ]
  let Roles = [
    {
      rolename:"HR",
      permissions:[
        {
          id:1,
          roleName:"report"
        },
        {
          id:2,
          roleName:"dashboard"
        }
      ]
    }
  ]

  beforeEach(() => {
    let httpClientSpyObj=jasmine.createSpyObj("HttpClient",['get' , 'post'])

    TestBed.configureTestingModule({
      providers:[
        PassDataService,
      {
        provide:HttpClient,
        useValue:httpClientSpyObj
      }]
    });
    service = TestBed.inject(PassDataService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe("getStreams()",()=>{

    it("should return stream data when called",()=>{
        httpClientSpy.get.and.returnValue(of(Permission));
        service.getRoles().subscribe({
          next:(posts)=>{
              expect(posts).toEqual(Permission);
          }
        })
        expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    })

  })

  describe("getPermissions()",()=>{

    it("should return stream data when called",()=>{
        httpClientSpy.get.and.returnValue(of(Roles));
        service.getPermisson().subscribe({
          next:(posts)=>{
              console.log(posts)
              expect(posts).toEqual(Roles);
          }
        })
        expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    })

  })

  describe("postStream()",()=>{
    it("should add stream when called",()=>{

      const newRole={id:3,roleName:"role"}
      httpClientSpy.post.and.returnValue(of(Permission));
        service.setRoles(newRole).subscribe(
          (res)=> Permission.push(newRole)
          )
        expect(Permission.length).toEqual(3)
        expect(httpClientSpy.post).toHaveBeenCalledTimes(1)
    })
  })

});
