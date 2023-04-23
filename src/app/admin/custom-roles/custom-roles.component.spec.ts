import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipGrid, MatChipsModule } from '@angular/material/chips';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { CustomRolesComponent } from './custom-roles.component';
import { PassDataService } from './services/pass-data.service';

describe('CustomRolesComponent', () => {
  let component: CustomRolesComponent;
  let fixture: ComponentFixture<CustomRolesComponent>;
  let snackBarSpy : jasmine.SpyObj<MatSnackBar>
  let service: PassDataService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let passDataServiceSpy:jasmine.SpyObj<PassDataService>;
  let permission=[
    {
      id:1,
      name:"role"
    },
    {
      id:2,
      name:"report"
    }
  ]

  beforeEach(async () => {

    let snackBarSpyObj = jasmine.createSpyObj("MatSnackBar" , ['openSnackBar'])
    let httpClientSpyObj=jasmine.createSpyObj("HttpClient",['get'])
    let passDataServiceSpyObj=jasmine.createSpyObj("ManageStreamService",['getRoles','getPermission'])

    await TestBed.configureTestingModule({
      declarations: [ CustomRolesComponent ],
      imports:[MatCardModule , MatFormFieldModule , MatChipsModule , MatAutocompleteModule , MatCheckboxModule , BrowserAnimationsModule ],
      providers:[
        PassDataService,
        {
          provide:MatSnackBar,
          useValue:snackBarSpyObj
        },
        {
          provide:HttpClient,
          useValue:httpClientSpyObj
        }
      ]
    })
    .compileComponents();

    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>
    service = TestBed.inject(PassDataService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>
    fixture = TestBed.createComponent(CustomRolesComponent);
    passDataServiceSpy = TestBed.inject(PassDataService) as jasmine.SpyObj<PassDataService>
    component = fixture.componentInstance;
    component.managePermissions=[{id:1,name:"DataScience"}]
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    httpClientSpy.get.and.returnValue(of(permission));
    passDataServiceSpy.getPermisson().subscribe({
      next:(posts)=>{
        component.managePermissions=posts
    }
    })
    fixture.detectChanges();
  });

  it('should create', () => {
    
    fixture.detectChanges();
    const inputElement = fixture.nativeElement;
    const inputdata=fixture.debugElement
    const inp=inputdata.queryAll(By.css('.spacing mat-card .adjustalign'))
    console.log(inp)
    const input = inputElement.querySelector('.spacing mat-card .adjustalign');
    input.value="DataScience"
    expect(input?.value).toContain("DataScience");
  });

});
