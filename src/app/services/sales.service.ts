import { inject, Injectable } from '@angular/core';
import { ProductCartService } from './product-cart.service';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  #productCartService = inject(ProductCartService);
  cartItems = this.#productCartService.getCheckoutDetails()
}
