import { Component, DoCheck, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ReportsService } from '../services/reports.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit{
  filterForm!: FormGroup;
  statuses:string[]= [];
  rounds: any;
  streams:any;
  stages!: any;
  accordionHide: boolean = false;
  searchForm!: FormGroup;
  stageWiseRounds!: string[];

  constructor(
    private fb: FormBuilder,
    private _aService: ReportsService
  ) {}

  // ng on Init
  ngOnInit(): void {
    this.filterForm = this.fb.group({
      // rounds: new FormControl(''),
      streams: new FormControl(''),
      statuses: new FormControl(''),
      stages: new FormControl(''),
    });

    this.searchForm = this.fb.group({
      query: new FormControl(''),
    });

    this.statuses = this._aService.getStatuses();
    this._aService.getStages().subscribe((stages) => (this.stages = stages));
    this._aService
      .getStreams()
      .subscribe((streams) => (this.streams = streams));
  }

  stageChange() {
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
    // url += this.filterForm.value.rounds?`${this.filterForm.value.rounds}/`:'';
    url += this.filterForm.value.statuses?`${this.filterForm.value.statuses}/`:'';
    url += this.filterForm.value.streams?`${this.filterForm.value.streams}/`:'';
    console.log(url);
    this._aService.applyFilter(url);
  }
    // Export to exel
    exportexcel(): void
    {
      /* pass here the table id */
      let element = document.getElementById('htmlData');
      const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
   
      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
   
      /* save to file */  
      XLSX.writeFile(wb, 'Report.xlsx');
   
    }

  // search data
  searchData() {
    if(this.searchForm.value['query'].trim()==='')
      this._aService.getData(0);
    else
      this._aService.search(this.searchForm.value['query']);
  }
}
