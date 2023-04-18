import { Component, DoCheck, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ManageApplicantService } from '../services/manage-applicant.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit, DoCheck {
  filterForm!: FormGroup;
  statuses: string[] = [
    'Offered',
    'Rejected',
    'Test Cleared',
    'Pending',
    'On Hold',
    'Backed-out',
  ];
  rounds: any;
  streams:any;
  stages!: any;
  accordionHide: boolean = false;
  searchForm!: FormGroup;
  stageWiseRounds!: string[];

  constructor(
    private fb: FormBuilder,
    private _aService: ManageApplicantService
  ) {}

  // ng on Init
  ngOnInit(): void {
    this.filterForm = this.fb.group({
      // rounds: new FormControl(''),
      streams: new FormControl(''),
      statuses: new FormControl(''),
      stages: new FormControl('Screening Stage', { nonNullable: true }),
    });

    this.searchForm = this.fb.group({
      query: new FormControl(''),
    });

    this._aService.getStages().subscribe((stages) => (this.stages = stages));
    this._aService
      .getStreams()
      .subscribe((streams) => (this.streams = streams));
  }

  ngDoCheck() {
    if (this.stages) {
      let index = this.stages.findIndex(
        (stage: any) => stage.stageName === this.filterForm.value['stages']
      );
      this.rounds = this.stages[index].rounds;
    }
  }

  // advance filter expansion panel
  openAccordion() {
    this.accordionHide = !this.accordionHide;
    this.filterForm.reset();
  }

  // apply filter
  applyFilter() {
    console.log(this.filterForm.value);
    let url = '/';
    url += this.filterForm.value.stages?`${this.filterForm.value.stages}/`:'';
    url += this.filterForm.value.rounds?`${this.filterForm.value.rounds}/`:'';
    url += this.filterForm.value.statuses?`${this.filterForm.value.statuses}/`:'';
    url += this.filterForm.value.streams?`${this.filterForm.value.streams}/`:'';
    console.log(url);
    this._aService.applyFilter(url);
  }

  // search data
  searchData() {
    console.log(this.searchForm.value);
  }
}
