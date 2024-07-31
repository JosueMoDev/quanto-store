import { Injectable, signal } from '@angular/core';
import { Product } from '@models/product.model';
export interface CartItems {
  product: Product;
  quantity: number;
}

export interface CheckoutDetails { 
  cartItems: CartItems[],
  cartCounter: number,
  subtotal: number;
  tax: number;
  total: number;
}
@Injectable({
  providedIn: 'root',
})
export class ProductCartService {
  #cartItems = signal<CartItems[] | []>([]);
  #cartCounter = signal<number>(0);
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
    this.#getCartItems(),
    this.#getCartCounter(),
    this.#calculateCheckoutDetails()
    const checkoutDetails: CheckoutDetails = {
      cartItems: this.#getCartItems(),
      cartCounter: this.#getCartCounter(),
      ...this.#calculateCheckoutDetails()
    }
    this.#checkOutDatails.set(checkoutDetails);
    console.log(this.#checkOutDatails())
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
      subtotal: 0,
      total: 0,
    }
    return checkoutDetails ? JSON.parse(checkoutDetails) : checkoutItemsMock;
  }

  #getCartItems() {
    return this.#cartItems();
  }

  clearCheckoutDetails(){
    this.#cartItems.set([]);
    this.#removeCheckoutDetailsFromLocalStorage();
  }

  #calculateCheckoutDetails() {
    const subtotal = this.#cartItems().reduce(
      (acc: any, item: CartItems) => acc + item.product.price * item.quantity,
      0
    );
    const tax = subtotal * this.#taxRate;
    const total = subtotal + tax;
    return {
      tax,
      total,
      subtotal
    }
  }

  getCheckoutDetails() {
    return this.#checkOutDatails();
  }
}
