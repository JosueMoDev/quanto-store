import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductCartService {
  constructor() {}
  private cart: any = [];

  addToCart(product: any) {
    this.cart.push(product) ;
  }

  getCart() {
    return this.cart;
  }

  clearCart() {
    this.cart = [];
  }
}
