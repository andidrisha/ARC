import { CartItem } from "app/models/cart-item.model";

export class ShoppingCart {
  public items: CartItem[] = new Array<CartItem>();

  public updateFrom(src: ShoppingCart) {
    this.items = src.items;
  }
}
