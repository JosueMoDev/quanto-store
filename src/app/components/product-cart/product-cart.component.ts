import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, MenuController } from '@ionic/angular';
import { ProductCartService } from 'src/app/services/product-cart.service';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class ProductCartComponent {
  cartItems: any = [];
  subtotal = 0;
  tax = 0;
  total = 0;
  taxRate = 0.13;

  constructor(
    private cartService: ProductCartService,
    private menuCtrl: MenuController
  ) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCart();
    this.calculateTotals();
  }

  closeMenu() {
    this.menuCtrl.close('end'); // Cierra el menú lateral
  }

  calculateTotals() {
    this.subtotal = this.cartItems.reduce(
      (acc: any, item: any) => acc + item.price * item.quantity,
      0
    );
    this.tax = this.subtotal * this.taxRate;
    this.total = this.subtotal + this.tax;
  }
}
