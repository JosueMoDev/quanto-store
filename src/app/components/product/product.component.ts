import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {addOutline, addSharp, cartOutline, removeOutline, removeSharp} from 'ionicons/icons'
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

  @Input() product!: { image: string; name: string; price: number };
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
    
  }
}
