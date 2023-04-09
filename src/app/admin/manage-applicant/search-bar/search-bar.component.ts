import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit{

  filterForm!:FormGroup;
  rounds:string[] = ["Screening","Online Apptitude Test","Technical Interview","Technical Interview II","HR Interview"];
  statuses:string[] = ["Selected","Rejected","Test Cleared","On Hold","Backed-out"];
  streams:string[]= ["Java","UI","DevOps","QA","SRE"];
  accordionHide:boolean = false;
  searchForm!:FormGroup;

  constructor(private fb :FormBuilder){

  }

  // ng on Init
  ngOnInit(): void {
    this.filterForm = this.fb.group({
      rounds:new FormControl(''),
      streams:new FormControl(''),
      statuses: new FormControl('')
    });

    this.searchForm = this.fb.group({
      query:new FormControl(''),
    });
  }

  // advance filter expansion panel
  openAccordion(){
    this.accordionHide=!this.accordionHide;
    this.filterForm.reset();
  }

  // apply filter
  applyFilter(){
    console.log(this.filterForm.value);
  }

  // search data
  searchData(){
    console.log(this.searchForm.value);
  }
}
