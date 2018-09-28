import { async, inject, TestBed } from "@angular/core/testing";
import { HttpModule } from "@angular/http";
import { CartItem } from "app/models/cart-item.model";
import { CaseStudy } from "../../models/casestudy.model";
import { ShoppingCart } from "app/models/shopping-cart.model";
import { CaseStudyDataService } from "../../services/casestudys.service";
import { ShoppingCartService } from "app/services/shopping-cart.service";
import { LocalStorageServie, StorageService } from "app/services/storage.service";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import * as sinon from "sinon";
import { CheckoutComponent } from "./checkout.component";

const CASESTUDY_1 = new CaseStudy();
CASESTUDY_1.name = "CaseStudy 1";
CASESTUDY_1.id = "1";
CASESTUDY_1.summary = "summary 1";
CASESTUDY_1.description = "desc1";

const CASESTUDY_2 = new CaseStudy();
CASESTUDY_2.name = "CaseStudy 2";
CASESTUDY_2.id = "2";
CASESTUDY_2.summary = "summary 2";
CASESTUDY_2.description = "desc2";

class MockCasestudyDataService extends CaseStudyDataService {
  public all(): Observable<CaseStudy[]> {
    return Observable.from([[CASESTUDY_1, CASESTUDY_2]]);
  }
}

// tslint:disable-next-line:max-classes-per-file
class MockShoppingCartService {
  public unsubscriveCalled: boolean = false;
  public emptyCalled: boolean = false;

  private subscriptionObservable: Observable<ShoppingCart>;
  private subscriber: Observer<ShoppingCart>;
  private cart: ShoppingCart = new ShoppingCart();

  public constructor() {
    this.subscriptionObservable = new Observable<ShoppingCart>((observer: Observer<ShoppingCart>) => {
      this.subscriber = observer;
      observer.next(this.cart);
      return () => this.unsubscriveCalled = true;
    });
  }

  public get(): Observable<ShoppingCart> {
    return this.subscriptionObservable;
  }

  public empty(): void {
    this.emptyCalled = true;
  }

  public dispatchCart(cart: ShoppingCart): void {
    this.cart = cart;
    if (this.subscriber) {
      this.subscriber.next(cart);
    }
  }
}

describe("CheckoutComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CheckoutComponent
      ],
      imports: [
        HttpModule
      ],
      providers: [
        { provide: CaseStudyDataService, useClass: MockCasestudyDataService },
        { provide: StorageService, useClass: LocalStorageServie },
        { provide: ShoppingCartService, useClass: MockShoppingCartService }
      ]
    }).compileComponents();
  }));

  it("should create the component", async(() => {
    const fixture = TestBed.createComponent(CheckoutComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  }));

  it("should display all the casetstudies in the cart",
    async(inject([ShoppingCartService], (service: MockShoppingCartService) => {
      const newCart = new ShoppingCart();
      const cartItem = new CartItem();
      cartItem.casestudyId = CASESTUDY_1.id;
      cartItem.quantity = 2;
      newCart.items = [cartItem];
      service.dispatchCart(newCart);
      const fixture = TestBed.createComponent(CheckoutComponent);
      fixture.detectChanges();

      const component = fixture.debugElement.componentInstance;
      const compiled = fixture.debugElement.nativeElement;
      const casestudyElements = compiled.querySelectorAll(".checkout_row");

      expect(casestudyElements.length).toEqual(1);
      expect(casestudyElements[0].querySelector(".js-casestudy-name").textContent).toEqual(CASESTUDY_1.name);
      expect(casestudyElements[0].querySelector(".js-casestudy-desc").textContent).toContain(CASESTUDY_1.description);
      expect(casestudyElements[0].querySelector(".js-casestudy-desc").textContent).toContain(CASESTUDY_1.summary);
    })));
});
