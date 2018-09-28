import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { CartItem } from "app/models/cart-item.model";
import { CaseStudy } from "../../models/casestudy.model";
import { ShoppingCart } from "app/models/shopping-cart.model";
import { CaseStudyDataService } from "../../services/casestudys.service";
import { ShoppingCartService } from "app/services/shopping-cart.service";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

interface ICartItemWithCaseStudy extends CartItem {
  casestudy: CaseStudy;
}

@Component({
  selector: "app-checkout",
  styleUrls: ["./checkout.component.scss"],
  templateUrl: "./checkout.component.html"
})
export class CheckoutComponent implements OnInit, OnDestroy {
  public cart: Observable<ShoppingCart>;
  public cartItems: ICartItemWithCaseStudy[];
  public itemCount: number;

  private casestudys: CaseStudy[];
  private cartSubscription: Subscription;

  public constructor(private casestudyService: CaseStudyDataService,
    private shoppingCartService: ShoppingCartService) {
  }

  public emptyCart(): void {
    this.shoppingCartService.empty();
  }

  public ngOnInit(): void {
    this.cart = this.shoppingCartService.get();
    this.cartSubscription = this.cart.subscribe((cart) => {
      this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
      this.casestudyService.all().subscribe((casestudys) => {
        this.casestudys = casestudys;
        this.cartItems = cart.items
          .map((item) => {
            const casestudy = this.casestudys.find((p) => p.id === item.casestudyId);
            return { ...item, casestudy
            };
          });
      });
    });
  }

  public createPDF(cartItems: ICartItemWithCaseStudy[]): void {

    var filteredCasestudys = cartItems.map(x => x.casestudy);
    filteredCasestudys.forEach(function (x) {
      console.log("yo checkout ts -> " + x.name);
    });

    this.casestudyService.createPDF(filteredCasestudys).subscribe();
  }

  public ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}
