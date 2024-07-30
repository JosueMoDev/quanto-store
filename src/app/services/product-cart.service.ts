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
  private _cart =  signal<Cart[]>([]);

  addToCart(item: Cart) {
    this._cart.set([...this._cart(), item]) ;
  }

  getCart() {
    return this._cart();
  }

  clearCart() {
    this._cart.set([]);
  }
  
}
