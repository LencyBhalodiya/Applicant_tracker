import { Component, SimpleChange, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { MatFabButton } from '@angular/material/button';

@Component({
  selector: 'app-manage-streams',
  templateUrl: './manage-streams.component.html',
  styleUrls: ['./manage-streams.component.css']
})
export class ManageStreamsComponent {

  streams=["Java","QA","UI","Flutter","DevOps","DBA","C#","SRE","Project Coordinator"];

  addStream(inputStream:any){
  
    this.streams.push(String(inputStream.value))
    inputStream.value=''
    
  }

  deleteStream(ele:HTMLElement){
      ele.remove();
  }


  enable(btn:MatFabButton,inputvalue:string)
  {
    if(inputvalue=="")
    {
      btn.disabled=true;
    }
    else
    {
      btn.disabled=false;
    }
     
  }


}
