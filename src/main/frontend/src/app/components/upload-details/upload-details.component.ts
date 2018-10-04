import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { CaseStudyDataService } from "../../services/casestudys.service";

@Component({
  selector: 'app-upload-details',
  templateUrl: './upload-details.component.html',
  styleUrls: ['./upload-details.component.scss']
})
export class UploadDetailsComponent implements OnInit {

  selectedFile: File = null;

  constructor(public activeModal: NgbActiveModal,
    private caseStudyService: CaseStudyDataService) { }

  ngOnInit() {
  }

  public onFileSelected(event): void {
    this.selectedFile = <File>event.target.files[0];
  }

  onSubmit(form: NgForm) {   
    const fd = new FormData();
    fd.append("casestudy", this.selectedFile);
    fd.append("casestudyname", form.value.casestudyname);
    fd.append("clientname", form.value.clientname);
    fd.append("tags", form.value.tags);
    console.log("In submit form "+form.value.casestudyname);
    this.caseStudyService.uploadCasestudy(fd).subscribe();
    this.activeModal.dismiss();
  }

}
