import { Component, OnInit } from '@angular/core';
import { MatFabButton } from '@angular/material/button';
import { ManageStreamService } from './service/manage-stream.service';

@Component({
  selector: 'app-manage-streams',
  templateUrl: './manage-streams.component.html',
  styleUrls: ['./manage-streams.component.css']
})
export class ManageStreamsComponent implements OnInit{
  
  stream!:any[]

  constructor(private data: ManageStreamService) { }

  //Function to add New Stream
  addStream(inputStream: any) {
    if(inputStream.value=="")
    {
      return;
    }
    this.data.setStreams({streamName:inputStream.value}).subscribe((response)=>this.stream.push(response))
    inputStream.value=''
    setTimeout(()=>{
      this.data.getStreams().subscribe((stream) => {
        this.stream=stream.filter((item)=> item.isActive==true)
      })
    },1500)
  }

  //Calling API
  ngOnInit() {
    this.data.getStreams().subscribe((stream) => {
      this.stream=stream.filter((item)=> item.isActive==true)
    })
  }

  //Method for input Validation
  enable(btn: MatFabButton, inputvalue: string) {
    if (inputvalue == "") {
      btn.disabled = true;
    }
    else {
      btn.disabled = false;
    }
  }
}
