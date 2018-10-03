import { Component, OnInit } from '@angular/core';
import { CaseStudyDataService } from "../../services/casestudys.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadDetailsComponent } from '../upload-details/upload-details.component';

@Component({
  selector: 'app-upload-casestudy',
  templateUrl: './upload-casestudy.component.html',
  styleUrls: ['./upload-casestudy.component.scss']
})
export class UploadCasestudyComponent implements OnInit {

  selectedFile: File = null;

  public constructor(private caseStudyService: CaseStudyDataService,
    private modalService: NgbModal) {
  }


  ngOnInit() {
  }

  public open() {
    this.modalService.open(UploadDetailsComponent);
  }

}
