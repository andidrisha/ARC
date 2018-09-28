import { inject, TestBed } from "@angular/core/testing";
import { HttpModule, Response, ResponseOptions, XHRBackend } from "@angular/http";
import { MockBackend } from "@angular/http/testing";
import { CaseStudy } from "../../models/casestudy.model";
import { CaseStudyDataService } from "../casestudys.service";

describe("CaseStudyDataService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        CaseStudyDataService,
       { provide: XHRBackend, useClass: MockBackend }
     ]
    });
  });

  it("should be injectable", inject([CaseStudyDataService], (service: CaseStudyDataService) => {
    expect(service).toBeTruthy();
  }));

  describe("all()", () => {
    it("should call the correct http endpoint",
       inject([CaseStudyDataService, XHRBackend],
       (service: CaseStudyDataService, mockBackend: MockBackend) => {

      mockBackend.connections.subscribe((connection) => {
        expect(connection.request.url).toEqual("./assets/casestudy.json");
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(createCasestudys(2))
        })));
      });

      service.all()
             .subscribe((casestudys) => {
                expect(casestudys.length).toBe(2);
                expect(casestudys[0].id).toBe("0");
                expect(casestudys[1].id).toBe("1");
             });
    }));
  });
});

function createCasestudys(count: number): CaseStudy[] {
  const casestudys = new Array<CaseStudy>();
  for (let i = 0; i < count; i += 1) {
    const casestudy = new CaseStudy();
    casestudy.id = i.toString();
    casestudy.name = `name ${i}`;
    casestudy.description = `description ${i}`;
    casestudy.summary = `summmary ${i}`;
    casestudys.push(casestudy);
  }

  return casestudys;
}
