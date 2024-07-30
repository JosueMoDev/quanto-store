import { Injectable, signal } from '@angular/core';
import { Product } from '@models/product.model';
export interface Cart {
  product: Product;
  quantity: number;
}
@Injectable({
  providedIn: 'root',
})
export class ProductCartService {
  constructor() {}
  private _cart = signal<Cart[]>([]);
  _cartCounter = signal<number|null>(null)

  addToCart(item: Cart) {
    this._cart.set([...this._cart(), item]);
    this.getCartCounter();
    console.log(this._cartCounter())
  }

  getCartCounter() {
    const totalItemQuantity = this._cart().reduce(
      (total, product) => total + product.quantity,
      0
    );
    this._cartCounter.set(totalItemQuantity);
    return this._cartCounter();
  }

  getCart() {
    return this._cart();
  }

  clearCart() {
    this._cart.set([]);
  }
  
}
