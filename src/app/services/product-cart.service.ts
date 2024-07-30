import { Injectable } from '@angular/core';
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
  private cart: Cart[] = [];

  addToCart(item: Cart) {
    this.cart.push(item) ;
  }

  getCart() {
    return this.cart;
  }

  clearCart() {
    this.cart = [];
  }
}
