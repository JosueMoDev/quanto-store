import { Injectable, signal } from '@angular/core';
import { Product } from '@models/product.model';
export interface CartItems {
  product: Product;
  quantity: number;
}

export interface CheckoutDetails { 
  cartItems: CartItems[],
  cartCounter: number,
  subTotal: number;
  tax: number;
  total: number;
}
@Injectable({
  providedIn: 'root',
})
export class ProductCartService {
  #cartItems = signal<CartItems[] | []>(this.#getChechoutDetailsFromLocalStorage().cartItems);
  #cartCounter = signal<number>(this.#getChechoutDetailsFromLocalStorage().cartCounter);
  #checkOutDatails = signal<CheckoutDetails>(this.#getChechoutDetailsFromLocalStorage());
  #taxRate = 0.13;

  addToCart({ product, quantity }: CartItems) {
    const currentProducts = this.#cartItems();
    const existingProduct = currentProducts.find(
      (item) => item.product.id === product.id
    );
    if (existingProduct) {
      existingProduct.quantity += quantity;
      this.#cartItems.set([...currentProducts]);
      this.#saveCheckoutDetailsOnLocalStorage();
      return;
    }
    this.#cartItems.set([...currentProducts, { product, quantity }]);
    this.#saveCheckoutDetailsOnLocalStorage();
  }

  removeFromCart(product: Product) {
    const currentProducts = this.#cartItems();
    const filteredCartItems = currentProducts.filter(
      (item) => item.product.id !== product.id
    );
    this.#cartItems.set(filteredCartItems);
    this.#saveCheckoutDetailsOnLocalStorage();
    this.#calculateCheckoutDetails();
    if (this.#getCartCounter() === 0) {
      this.#removeCheckoutDetailsFromLocalStorage();
    }
  }

  #getCartCounter() {
    const totalItemQuantity = this.#cartItems().reduce(
      (total, product) => total + product.quantity,
      0
    );
    this.#cartCounter.set(totalItemQuantity);
    return this.#cartCounter();
  }

  #saveCheckoutDetailsOnLocalStorage() {
    
    const checkoutDetails: CheckoutDetails = {
      cartItems: this.#getCartItems(),
      cartCounter: this.#getCartCounter(),
      ...this.#calculateCheckoutDetails()
    }
    this.#checkOutDatails.set(checkoutDetails);
    localStorage.setItem('checkoutDetails', JSON.stringify(checkoutDetails));
  }

  #removeCheckoutDetailsFromLocalStorage() {
    localStorage.removeItem('checkoutDetails');
  }

  #getChechoutDetailsFromLocalStorage(): CheckoutDetails {
    const checkoutDetails = localStorage.getItem('checkoutDetails');
    const checkoutItemsMock: CheckoutDetails = {
      cartItems: [],
      cartCounter: 0,
      tax: 0,
      subTotal: 0,
      total: 0,
    }
    return checkoutDetails ? JSON.parse(checkoutDetails) : checkoutItemsMock;
  }

  #getCartItems() {
    return this.#cartItems();
  }

  clearCheckoutDetails() {
    this.#checkOutDatails.set({
      cartItems: [],
      cartCounter: 0,
      tax: 0,
      subTotal: 0,
      total: 0,
    });
    this.#cartItems.set([])
    this.#cartCounter.set(0)
    this.#removeCheckoutDetailsFromLocalStorage();
  }

  #calculateCheckoutDetails() {
    const subTotal = this.#cartItems().reduce(
      (acc: any, item: CartItems) => acc + item.product.price * item.quantity,
      0
    );
    const tax = subTotal * this.#taxRate;
    const total = subTotal + tax;
    return {
      tax,
      total,
      subTotal
    }
  }

  getCheckoutDetails() {
    return this.#checkOutDatails();
  }
}
