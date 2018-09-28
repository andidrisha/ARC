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
import { ShoppingCartComponent } from "../shopping-cart/shopping-cart.component";
import { StoreFrontComponent } from "./store-front.component";

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

// tslint:disable-next-line:max-classes-per-file
class MockCaseStudyDataService extends CaseStudyDataService {
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

  public addItem(casestudy: CaseStudy, quantity: number): void {}

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

describe("StoreFrontComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ShoppingCartComponent,
        StoreFrontComponent
      ],
      imports: [
        HttpModule
      ],
      providers: [
       { provide: CaseStudyDataService, useClass: MockCaseStudyDataService },
       { provide: StorageService, useClass: LocalStorageServie },
       { provide: ShoppingCartService, useClass: MockShoppingCartService }
     ]
    }).compileComponents();
  }));

  it("should create the component", async(() => {
    const fixture = TestBed.createComponent(StoreFrontComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  }));

  it("should display all the casestudys", async(() => {
    const fixture = TestBed.createComponent(StoreFrontComponent);
    fixture.detectChanges();

    const component = fixture.debugElement.componentInstance;
    const compiled = fixture.debugElement.nativeElement;
    const casestudyElements = compiled.querySelectorAll(".casestudy-container");
    expect(casestudyElements.length).toEqual(2);

    expect(casestudyElements[0].querySelector(".js-casestudy-name").textContent).toEqual(CASESTUDY_1.name);
    expect(casestudyElements[0].querySelector(".js-casestudy-price").textContent).toContain(CASESTUDY_1.summary);
    expect(casestudyElements[0].querySelector(".js-casestudy-desc").textContent).toContain(CASESTUDY_1.description);

    expect(casestudyElements[1].querySelector(".js-casestudy-name").textContent).toEqual(CASESTUDY_2.name);
    expect(casestudyElements[1].querySelector(".js-casestudy-price").textContent).toContain(CASESTUDY_2.summary);
    expect(casestudyElements[1].querySelector(".js-casestudy-desc").textContent).toContain(CASESTUDY_2.description);
  }));

  it("should not display the remove item button when the item is not in the cart", async(() => {
    const fixture = TestBed.createComponent(StoreFrontComponent);
    fixture.detectChanges();

    const component = fixture.debugElement.componentInstance;
    const compiled = fixture.debugElement.nativeElement;
    const casestudyElements = compiled.querySelectorAll(".casestudy-container");
    expect(casestudyElements.length).toEqual(2);

    expect(casestudyElements[0].querySelector(".js-casestudy-name").textContent).toEqual(CASESTUDY_1.name);
    expect(casestudyElements[0].querySelector(".js-casestudy-price").textContent).toContain(CASESTUDY_1.summary);
    expect(casestudyElements[0].querySelector(".js-casestudy-desc").textContent).toContain(CASESTUDY_1.description);
    expect(casestudyElements[0].querySelectorAll(".js-btn-remove").length).toEqual(0);
  }));

  it("should add the casestudy to the cart when add item button is clicked",
     async(inject([ShoppingCartService], (service: MockShoppingCartService) => {
    const fixture = TestBed.createComponent(StoreFrontComponent);
    fixture.detectChanges();

    const addItemSpy = sinon.spy(service, "addItem");

    const component = fixture.debugElement.componentInstance;
    const compiled = fixture.debugElement.nativeElement;
    const casestudyElements = compiled.querySelectorAll(".casestudy-container");

    casestudyElements[0].querySelector(".js-btn-add").click();
    sinon.assert.calledOnce(addItemSpy);
    sinon.assert.calledWithExactly(addItemSpy, CASESTUDY_1, 1);
  })));

  it("should remove the casestudy from the cart when remove item button is clicked",
     async(inject([ShoppingCartService], (service: MockShoppingCartService) => {
    const newCart = new ShoppingCart();
    const cartItem = new CartItem();
    cartItem.casestudyId = CASESTUDY_1.id;
    cartItem.quantity = 1;
    newCart.items = [cartItem];
    service.dispatchCart(newCart);
    const fixture = TestBed.createComponent(StoreFrontComponent);
    fixture.detectChanges();

    const addItemSpy = sinon.spy(service, "addItem");

    const component = fixture.debugElement.componentInstance;
    const compiled = fixture.debugElement.nativeElement;
    const casestudyElements = compiled.querySelectorAll(".casestudy-container");

    casestudyElements[0].querySelector(".js-btn-remove").click();
    sinon.assert.calledOnce(addItemSpy);
    sinon.assert.calledWithExactly(addItemSpy, CASESTUDY_1, -1);
  })));
});
