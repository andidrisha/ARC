import { inject, TestBed } from "@angular/core/testing";
import { HttpModule, XHRBackend } from "@angular/http";
import { MockBackend } from "@angular/http/testing";
import { CaseStudy } from "../../models/casestudy.model";
import { ShoppingCart } from "app/models/shopping-cart.model";
import { CaseStudyDataService } from "../casestudys.service";
import "rxjs/add/observable/from";
import { Observable } from "rxjs/Observable";
import * as sinon from "sinon";
import { ShoppingCartService } from "../shopping-cart.service";
import { LocalStorageServie, StorageService } from "../storage.service";

const CASESTUDY_1 = new CaseStudy();
CASESTUDY_1.name = "CaseStudy 1";
CASESTUDY_1.id = "1";
CASESTUDY_1.summary = "summary 1";

const CASESTUDY_2 = new CaseStudy();
CASESTUDY_2.name = "CaseStudy 2";
CASESTUDY_2.id = "2";
CASESTUDY_2.summary = "summary 2";

class MockCaseStudyDataService extends CaseStudyDataService {
  public all(): Observable<CaseStudy[]> {
    return Observable.from([[CASESTUDY_1, CASESTUDY_2]]);
  }
}

describe("ShoppingCartService", () => {
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();

    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
       { provide: CaseStudyDataService, useClass: MockCaseStudyDataService },
       { provide: StorageService, useClass: LocalStorageServie },
        ShoppingCartService
     ]
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should be injectable", inject([ShoppingCartService], (service: ShoppingCartService) => {
    expect(service).toBeTruthy();
  }));

  describe("get()", () => {
    it("should return an Observable<ShoppingCart>",
       inject([ShoppingCartService], (service: ShoppingCartService) => {
      const obs = service.get();
      expect(obs).toEqual(jasmine.any(Observable));
    }));

    it("should return a ShoppingCart model instance when the observable is subscribed to",
       inject([ShoppingCartService], (service: ShoppingCartService) => {
      const obs = service.get();
      obs.subscribe((cart) => {
        expect(cart).toEqual(jasmine.any(ShoppingCart));
        expect(cart.items.length).toEqual(0);
      });
    }));

    it("should return a populated ShoppingCart model instance when the observable is subscribed to",
       inject([ShoppingCartService], (service: ShoppingCartService) => {
         const shoppingCart = new ShoppingCart();
         sandbox.stub(localStorage, "getItem")
                .returns(JSON.stringify(shoppingCart));

         const obs = service.get();
         obs.subscribe((cart) => {
         expect(cart).toEqual(jasmine.any(ShoppingCart));
      });
    }));
  });

  describe("empty()", () => {
    it("should create empty cart and persist",
       inject([ShoppingCartService], (service: ShoppingCartService) => {

      const stub = sandbox.stub(localStorage, "setItem");
      const obs = service.empty();

      sinon.assert.calledOnce(stub);
    }));

    it("should dispatch empty cart",
       inject([ShoppingCartService], (service: ShoppingCartService) => {
         let dispatchCount = 0;

         const shoppingCart = new ShoppingCart();
         sandbox.stub(localStorage, "getItem")
                .returns(JSON.stringify(shoppingCart));

         service.get()
                .subscribe((cart) => {
                    dispatchCount += 1;

                });

         service.empty();
         expect(dispatchCount).toEqual(2);
    }));
  });

  describe("addItem()", () => {
    beforeEach(() => {
      let persistedCart: string;
      const setItemStub = sandbox.stub(localStorage, "setItem")
            .callsFake((key, val) => persistedCart = val);
      sandbox.stub(localStorage, "getItem")
              .callsFake((key) => persistedCart);
    });

    it("should add the item to the cart and persist",
       inject([ShoppingCartService], (service: ShoppingCartService) => {
      service.addItem(CASESTUDY_1, 1);

      service.get()
            .subscribe((cart) => {
              expect(cart.items.length).toEqual(1);
              expect(cart.items[0].casestudyId).toEqual(CASESTUDY_1.id);
            });
    }));

    it("should dispatch cart",
       inject([ShoppingCartService], (service: ShoppingCartService) => {
         let dispatchCount = 0;

         service.get()
                .subscribe((cart) => {
                    dispatchCount += 1;
                });

         service.addItem(CASESTUDY_1, 1);
         expect(dispatchCount).toEqual(2);
    }));

    it("should set the correct quantity on CaseStudys already added to the cart",
       inject([ShoppingCartService], (service: ShoppingCartService) => {
      service.addItem(CASESTUDY_1, 1);
      service.addItem(CASESTUDY_1, 3);

      service.get()
            .subscribe((cart) => {
              expect(cart.items[0].quantity).toEqual(4);
            });
    }));
  });
});
