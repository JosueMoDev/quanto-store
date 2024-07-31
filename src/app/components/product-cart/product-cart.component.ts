import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Product } from '@models/product.model';
import { addIcons } from 'ionicons';
import { carOutline, removeOutline } from 'ionicons/icons';
import { CartItems, ProductCartService } from 'src/app/services/product-cart.service';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class ProductCartComponent  {
  #cartService = inject(ProductCartService);
  cartItems: CartItems[] = [];
 
  constructor() {
    effect(() => {
      this.cartItems = this.#cartService.getCheckoutDetails().cartItems;
    })
    addIcons({removeOutline, carOutline})
  }

  removeItemFromCart(product: Product) {
    return this.#cartService.removeFromCart(product)
  }
}
