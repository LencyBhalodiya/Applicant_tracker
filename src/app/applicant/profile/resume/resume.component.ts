import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import { ProfileService } from '../../profile-service/profile.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css'],
})
export class ResumeComponent {
  url: string = '';
  file: any;
  filename!: string;
  constructor(
    public dialogRef: MatDialogRef<ResumeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private profileService: ProfileService,
    private http: HttpClient
  ) {
    this.profileService.getResume(data.id).subscribe((url) => {
      this.file = new Blob([url], { type: 'application/pdf' });
      this.url = URL.createObjectURL(this.file);
    });
  }

  downloadPdf() {
    const url = this.url;
    this.http.get(url, { responseType: 'blob' }).subscribe((blob: Blob) => {
      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.download = 'file.pdf';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    });
  }
}
