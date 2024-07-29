import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {addOutline, cartOutline, removeOutline} from 'ionicons/icons'
import { Product } from 'src/app/models/product.model';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class ProductComponent {

  constructor() {
    addIcons({ addOutline, removeOutline, cartOutline });
  }

  @Input() product!: Product;
  quantity = 1;

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
      console.log('Product added to cart:', {
        ...this.product,
        quantity: this.quantity,
      });
  }
}
