import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-manage-streams',
  templateUrl: './manage-streams.component.html',
  styleUrls: ['./manage-streams.component.css']
})
export class ManageStreamsComponent {

  streams=["Java","QA","UI","Flutter","DevOps","DBA","C#","SRE","Project Coordinator"];

  addStream(inputStream:HTMLInputElement){
    this.streams.unshift(inputStream.value)
    inputStream.value=''
  }

  deleteStream(ele:HTMLElement){
      ele.remove();
  }

}
