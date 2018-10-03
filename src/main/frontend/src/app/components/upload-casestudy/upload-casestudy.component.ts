import { Component, OnInit } from '@angular/core';
import { CaseStudyDataService } from "../../services/casestudys.service";

@Component({
  selector: 'app-upload-casestudy',
  templateUrl: './upload-casestudy.component.html',
  styleUrls: ['./upload-casestudy.component.scss']
})
export class UploadCasestudyComponent implements OnInit {

  selectedFile: File = null;

  public constructor(private caseStudyService: CaseStudyDataService) {
  }


  ngOnInit() {
  }

  public onFileSelected(event): void {
    this.selectedFile = <File>event.target.files[0];
    const fd = new FormData();
    fd.append("casestudy", this.selectedFile.name);
    this.caseStudyService.uploadCasestudy(fd).subscribe(res => console.log(res));
  }
}
