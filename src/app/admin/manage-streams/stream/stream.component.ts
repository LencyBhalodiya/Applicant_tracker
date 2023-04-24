import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ManageStreamService } from '../service/manage-stream.service';


@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css']
})
export class StreamComponent {

  @Input() streamData!:{streamId:number,streamName:string};
 
  constructor(private _snackBar: MatSnackBar,private data:ManageStreamService) {}

  openSnackBar(message: string) {
    this._snackBar.open(message,'',{duration:3000});
  }

  deleteStream(element:HTMLElement,streamid:number){
    element.remove()
    this.data.deleteStreams(streamid).subscribe(res=>console.log("Success"))
  }

  editStream(edit:HTMLInputElement){
    if(edit.readOnly){
      edit.readOnly=false;
    }
    else{
      edit.readOnly=true
    }
  }

  edt(event:any,ida:any,name:any){
        if(event.keyCode==13){
          event.target.readOnly=true
          this.data.updateStream(ida,{streamName:name.value}).subscribe(res=>console.log("Updated"))
        }
  }
 
}
