import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css']
})
export class StreamComponent {

  @Input() streamData!:{id:number,streamName:string};

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: string,element:HTMLElement) {
    this._snackBar.open(message,'',{duration:3000});
    this.deleteStream(element)
  }

  deleteStream(element:HTMLElement){
    element.remove()
  }

}
