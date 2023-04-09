import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxFileDropEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css']
})
export class RegisterationComponent {
  isLinear = true;
  constructor(private _formBuilder: FormBuilder) { }
 
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
    ChooseResidence: ['', Validators.required],
    address: ['', Validators.required],
    country: ['', Validators.required],
    state: ['', Validators.required],
    city: ['', Validators.required],
    postalCode: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
    chooseStreams: ['', Validators.required],
    choosePositions: ['', Validators.required],
    willingToRelocate: ['', Validators.required],
    referralSource: ['', Validators.required],
    expectedCTC: ['', Validators.required],
    anyOffer: ['', Validators.required],
    anyInterview: ['', Validators.required],
    freshersOrexperienced:['',Validators.required]

  });
  thirdFormGroup = this._formBuilder.group({

  });

  streams = new FormControl('');
  positions = new FormControl('');

  streamList: string[] = ['JAVA', 'SRE', 'UI', 'QA', 'SQL', 'DBA'];
  positionList: string[] = ['Junior', 'Senior', 'Intern'];
  referenceList: string[] = ['Linked-In', 'Personal Referal', 'Naukari.com', "Company's Career Page"]

  Fresh: any;
  Expe: any;

  fresherFunction() {
    this.Fresh = true;
    this.Expe = false;
  }
  experiencedFunction() {
    this.Fresh = false;
    this.Expe = true;
  }

  title = 'dragdrop';
   public files:NgxFileDropEntry[] = []

  public dropped(files:NgxFileDropEntry[]){
    this.files = files;
  }

  public onFileOver(event: any){
    console.log(event);
  }

  public onFileLeave(event: any){
    console.log(event);
  }
}
