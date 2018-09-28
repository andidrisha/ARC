import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CaseStudy } from "../../models/casestudy.model";
import { ShoppingCart } from "app/models/shopping-cart.model";
import { CaseStudyDataService } from "../../services/casestudys.service";
import { ShoppingCartService } from "app/services/shopping-cart.service";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "app-store-front",
  styleUrls: ["./store-front.component.scss"],
  templateUrl: "./store-front.component.html"
})
export class StoreFrontComponent implements OnInit {

  public casestudys: Observable<CaseStudy[]>;

  public constructor(private caseStudyService: CaseStudyDataService,
    private shoppingCartService: ShoppingCartService) {
  }

  public addCaseStudyToCart(caseStudy: CaseStudy): void {
    this.shoppingCartService.addItem(caseStudy, 1);
  }

  public removeCaseStudyFromCart(caseStudy: CaseStudy): void {
    this.shoppingCartService.addItem(caseStudy, -1);
  }

  public caseStudyInCart(caseStudy: CaseStudy): boolean {
    return Observable.create((obs: Observer<boolean>) => {
      const sub = this.shoppingCartService
        .get()
        .subscribe((cart) => {

          obs.next(cart.items.some((i) => i.casestudyId === caseStudy.id));
          obs.complete();
        });
      sub.unsubscribe();
    });
  }

  receiveMessage($event) {
    this.casestudys = $event;
  }

  public ngOnInit(): void {
    this.casestudys = this.caseStudyService.all();
  }
}
