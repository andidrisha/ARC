import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CaseStudyDataService } from '../../services/casestudys.service';
import { Observable } from "rxjs/Observable";
import { CaseStudy } from "../../models/casestudy.model";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  filteredCasestudys: Observable<CaseStudy[]>;
  @Output() messageEvent = new EventEmitter<Observable<CaseStudy[]>>();

  public constructor(private caseStudyService: CaseStudyDataService) {
  }

  ngOnInit() {
  }

  public searchByQuery(queryValue: string, queryType: string): void {
    this.filteredCasestudys = this.caseStudyService.searchByQuery(queryType, queryValue);
    this.messageEvent.emit(this.filteredCasestudys);
  }

}
