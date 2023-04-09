import { Component } from '@angular/core';
import { MatFabButton } from '@angular/material/button';
import { ManageStreamService } from './service/manage-stream.service';

@Component({
  selector: 'app-manage-streams',
  templateUrl: './manage-streams.component.html',
  styleUrls: ['./manage-streams.component.css']
})
export class ManageStreamsComponent {
  
  stream!: any

  constructor(private data: ManageStreamService) { }

  //Function to add New Stream
  addStream(inputStream: any) {

    //this.stream.streamName=inputStream
    // this.streams.unshift(inputStream.value)
    // inputStream.value=''
  }

  //Calling API
  ngOnInit() {
    this.data.getStreams().subscribe((stream) =>{ 
      console.log('calling');
      
      this.stream = stream})
  }

  // ngAfterViewInit(stream:any){
  //  // console.log(stream)
  //  // this.data.setStreams(stream).subscribe(response=>response)
  //  this.data.setStreams({streamName:stream}).subscribe(response=>response)
  // }

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
