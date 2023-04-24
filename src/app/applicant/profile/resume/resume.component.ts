import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProfileService } from '../../profile-service/profile.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css'],
})
export class ResumeComponent {
  url: string = '';
  constructor(
    public dialogRef: MatDialogRef<ResumeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private profileService: ProfileService
  ) {
    this.profileService.getResume(data.id).subscribe((url) => {
      const file = new Blob([url], { type: 'application/pdf' });
      this.url = URL.createObjectURL(file);
    });
  }
}
