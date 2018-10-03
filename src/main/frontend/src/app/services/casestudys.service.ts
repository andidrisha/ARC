import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { CaseStudy } from "../models/casestudy.model";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";
import { CachcingServiceBase } from "./caching.service";
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class CaseStudyDataService extends CachcingServiceBase {
  private casestudys: Observable<CaseStudy[]>;
  public filteredCasestudys: Observable<CaseStudy[]>;

  public API_URL = "/api/v1/casestudy";

  public constructor(private http: Http) {
    super();

  }

  public all(): Observable<CaseStudy[]> {
    return this.cache<CaseStudy[]>(() => this.casestudys,
      (val: Observable<CaseStudy[]>) => this.casestudys = val,
      () => this.http
        .get(this.API_URL)
        .map((response) => response.json()
          .map((item) => {
            let model = new CaseStudy();
            model.updateFrom(item);
            return model;
          })));

  }

  public createPDF(casestudys: CaseStudy[]) {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(this.API_URL + "/convertToPdf", JSON.stringify(casestudys), options);
  }

  public uploadCasestudy(fd: FormData) {
    return this.http
      .post(this.API_URL + "/uploadCasestudy", fd);
  }

  public searchByQuery(queryType: string, queryValue: string): Observable<CaseStudy[]> {
    this.filteredCasestudys = this.http
      .get(this.API_URL + "/" + queryType + "/" + queryValue)
      .map((response) => response.json()
        .map((item) => {
          let model = new CaseStudy();
          model.updateFrom(item);
          return model;
        }));

    return this.filteredCasestudys;
  }

}
