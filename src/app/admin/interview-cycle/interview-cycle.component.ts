import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-interview-cycle',
  templateUrl: './interview-cycle.component.html',
  styleUrls: ['./interview-cycle.component.css'],
})
export class InterviewCycleComponent {
  onAddRoundClick(title: string) {
    console.log(title);
  }

  panels = [
    {
      title: 'Stage 1',
      description: 'Initial Screening',
      content: 'This is the primary content of the panel.',
    },
    {
      title: 'Stage 2',
      description: 'Online Test',
      content: 'This is the primary content of the panel.',
    },
    {
      title: 'Stage 3',
      description: 'Technical Round',
      content: 'This is the primary content of the panel.',
    },
    {
      title: 'Stage 4',
      description: 'Final HR Round',
      content: 'This is the primary content of the panel.',
    },
  ];
}
