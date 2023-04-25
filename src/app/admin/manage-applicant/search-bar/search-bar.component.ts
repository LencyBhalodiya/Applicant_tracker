import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ManageApplicantService } from '../services/manage-applicant.service';
import { Stage,Round } from '../models/models.interfaces';
import { InterviewCycleService } from '../../interview-cycle/services/interview-cycle.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, debounceTime, fromEvent, map, throwError } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit , AfterViewInit{
  filterForm!: FormGroup;
  statuses: string[] = [];
  rounds!: Round[];
  streams: any;
  stages!: Stage[];
  filterHide: boolean = false;
  searchForm!: FormGroup;
  stageWiseRounds!: string[];
  @ViewChild('searchInput') searchInput !: ElementRef;

  constructor(
    private fb: FormBuilder,
    private _aService: ManageApplicantService,
    private iService: InterviewCycleService,
    private snackBar : MatSnackBar
  ) {}

  @Output() searchEvent = new EventEmitter<any>();

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      // rounds: new FormControl(''),
      streams: new FormControl(''),
      statuses: new FormControl(''),
      stages: new FormControl(''),
      rounds:new FormControl('')
    });

    

    this.searchForm = this.fb.group({
      query: new FormControl(''),
    });

    this.statuses = this._aService.getStatuses();
    // this._aService.getStages().subscribe((stages) => (this.stages = stages));
    this.iService.getStages().subscribe((stages) => (this.stages = stages));
    this._aService
      .getStreams().pipe(catchError((error)=>{
        console.log("error while fetching streams..",error);
        return throwError(()=>{
          this.snackBar.open("Could not fetch Streams",'',{duration:2000})
        })
      }))
      .subscribe((streams) => (this.streams = streams));
  }

  ngAfterViewInit():void{
    const query = fromEvent<any>(this.searchInput.nativeElement,'keyup').pipe(map(event=>event.target.value),debounceTime(250));

    query.subscribe((res)=>{
      if(res)
      this._aService.search(res).subscribe((res)=>this.searchEvent.emit(res));
      else{
        this.searchEvent.emit(null);
      }
    });
  }

  stageChange() {
    if (this.stages) {
      let index = this.stages.findIndex(
        (stage: any) => stage.stageName === this.filterForm.value['stages']
      );
      this.rounds = this.stages[index].rounds;
    }
  }

  // advance filter  panel toggle
  openFilter() {
    this.filterHide = !this.filterHide;
    this.filterForm.reset();
    this._aService.getData(1);
    this.searchForm.reset();
    this.searchEvent.emit(null);
  }

  // apply filter
  applyFilter() {
    console.log(this.filterForm.value);
    let url = '/';
    let stage = this.filterForm.value.stages;
    let status = this.filterForm.value.statuses;
    let stream = this.filterForm.value.streams;
    let round = this.filterForm.value.rounds;


    if(stage && status && stream && round)
      url+=`get/${stage}/${status}/${stream}/${round}`
    else if(stage && status && stream)
      url+=`get/${stage}/${status}/${stream}`
    else if(stage && stream && round)
      url+=`${stage}/${stream}/${round}`;
    else if(status && stream && round)
      url+=`gets/${status}/${stream}/${round}`
    else if(stage && stream)
      url+=`get/${stage}/${stream}`;
    else if(status && stream)
      url+=`${status}/${stream}`
    else if(stream)
      url+=`get/${stream}`;
    else{
      this.snackBar.open("Invalid Filter",'',{duration:2000})
      return;
    }
    console.log(url);
    this._aService.applyFilter(url).subscribe(res=>this.searchEvent.emit(res));
  }

  // search data
  // searchData() {
  //   if (this.searchForm.value['query'].trim() === '') this._aService.getData(0);
  //   else this._aService.search(this.searchForm.value['query']);
  // }
}


