import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-applicant',
  templateUrl: './manage-applicant.component.html',
  styleUrls: ['./manage-applicant.component.css']
})
export class ManageApplicantComponent {
  selected = 'none';
  selected2 = 'none';
  selected3 = 'none';
  panelOpenState = false;
  ele !: HTMLCollection;
  visibleFlag:boolean = false;
  ngAfterViewInit(){
    this.ele = document.getElementsByClassName("hide-col");
    // console.log(ele);
    
  }
  bulkFeedback(){
    console.log("ok");
    // ele.style.visibility = "none"; 
    if (!this.visibleFlag) {
      for (let i = 0; i < this.ele.length; i++) {
        // console.log(this.ele[i]);
        this.ele[i].classList.add("d-block");
        this.visibleFlag = true;
      }
      
    }else if(this.visibleFlag){
      for (let i = 0; i < this.ele.length; i++) {
        // console.log(this.ele[i]);
        this.ele[i].classList.remove("d-block");
        this.ele[i].classList.add("d-none");
        this.visibleFlag = false;
      }
    }
    
    
  }
  

  // let panel:HTMLElement = document.getElementById('expPanel');
  showExpPanel(){
    this.panelOpenState = (!this.panelOpenState);    
  }
}

