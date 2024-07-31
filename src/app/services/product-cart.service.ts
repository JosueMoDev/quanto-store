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
  private _cart = signal<Cart[]|[]>(this.getFromLocalStorage());
  _cartCounter = signal<number | null>(null);

  addToCart({ product, quantity }: Cart) {
    const currentProducts = this._cart();
    const existingProduct = currentProducts.find(
      (item) => item.product.id === product.id
    );
    if (existingProduct) {
      existingProduct.quantity += quantity;
      this._cart.set([...currentProducts]);
      this.getCartCounter();
      this.saveCartItemsOnLocalStorage();
      return;
    }
    this._cart.set([...currentProducts, { product, quantity }]);
    this.getCartCounter();
    this.saveCartItemsOnLocalStorage();
  }

  getCartCounter() {
    const totalItemQuantity = this._cart().reduce(
      (total, product) => total + product.quantity,
      0
    );
    this._cartCounter.set(totalItemQuantity);
    return this._cartCounter();
  }

  removeFromCart(product: Product) {
    const currentProducts = this._cart();
    const filteredCartItems = currentProducts.filter(
      (item) => item.product.id !== product.id
    );
    this._cart.set(filteredCartItems);
    this.getCartCounter();
    this.saveCartItemsOnLocalStorage();
    if (this.getCartCounter() === 0) {
      this.removeCartFromLocalStorage();
    }
  }

  saveCartItemsOnLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this._cart()));
  }

  removeCartFromLocalStorage() {
    localStorage.removeItem('cartItems');
  }

  getFromLocalStorage(): Cart[]  {
    const cart = localStorage.getItem('cartItems');
    return cart ? JSON.parse(cart) : [];

  }

  getCart() {
    return this._cart();
  }

  clearCart() {
    this._cart.set([]);
    this.removeCartFromLocalStorage();
  }
}
