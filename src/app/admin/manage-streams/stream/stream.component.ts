import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css']
})
export class StreamComponent {

  @Input() streamName:string='';

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: string,ele:HTMLElement) {
    let snackBarRef=this._snackBar.open(message,'',{duration:3000});
  
    this.deleteStream(ele)
  }

  deleteStream(ele:HTMLElement){
    ele.remove()
  }

}
