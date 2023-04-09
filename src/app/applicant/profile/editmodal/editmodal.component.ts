import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-editmodal',
  templateUrl: './editmodal.component.html',
  styleUrls: ['./editmodal.component.css'],
})
export class EditmodalComponent {
  name: string = '';
  profiledata = this.data;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.profiledata = data;
  }
  ngOnInit() {
    console.log(this.data);
  }
}
