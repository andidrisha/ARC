import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { CheckoutComponent } from "./components/checkout/checkout.component";
import { OrderConfirmationComponent } from "./components/order-confirmation/order-confirmation.component";
import { StoreFrontComponent } from "./components/store-front/store-front.component";
import { SearchComponent } from "./components/search/search.component";
import { UploadDetailsComponent } from "./components/upload-details/upload-details.component";
import { PopulatedCartRouteGuard } from "./route-gaurds/populated-cart.route-gaurd";

@NgModule({
    exports: [RouterModule],
    imports: [
        RouterModule.forRoot([
            {
                canActivate: [PopulatedCartRouteGuard],
                component: CheckoutComponent,
                path: "checkout"
            },
            {
                canActivate: [PopulatedCartRouteGuard],
                component: OrderConfirmationComponent,
                path: "confirmed"
            },
            {
                component: SearchComponent,
                path: "search"
            },
            {
                component: UploadDetailsComponent,
                path: "upload"
            },
            {
                component: StoreFrontComponent,
                path: "**"
            }])
    ]
})
export class AppRoutingModule { }
