import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RefServicesService } from './services/ref-services.service';

@Component({
  selector: 'app-future-reference',
  templateUrl: './future-reference.component.html',
  styleUrls: ['./future-reference.component.css'],
})
export class FutureReferenceComponent implements OnInit {
  data: any = [{}];

  constructor(
    private _refService: RefServicesService,
    private router: Router
  ) {}

  getData() {
    this._refService.futureRef().subscribe((res) => {
      this.data = res;
    });
  }
  filter(name: string) {
    if (name == '') {
      this.getData();
    } else {
      this._refService.searchFilter(name).subscribe((res) => {
        this.data = res;
      });
    }
  }
  ngOnInit(): void {
    this.getData();
  }
  onRoute(id: number) {
    this.router.navigate(['applicant/profile/', id]);
  }
}
