import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MenuController } from '@ionic/angular/standalone';
import { ProductCartService } from '@services/product-cart.service';
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
  private readonly productCartService = inject(ProductCartService)
  private menuCtrl = inject(MenuController)
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
    this.productCartService.addToCart({
      product:this.product,
      quantity: this.quantity,
    });
    this.menuCtrl.open('right-menu'); 
  }
}
