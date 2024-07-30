import { CommonModule } from '@angular/common';
import { Component, effect, OnInit } from '@angular/core';
import { IonicModule, MenuController } from '@ionic/angular';
import { Cart, ProductCartService } from 'src/app/services/product-cart.service';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class ProductCartComponent implements OnInit {
  cartItems: Cart[] = [];
  subtotal = 0;
  tax = 0;
  total = 0;
  taxRate = 0.13;
  totalGlobal = 0;
  constructor(
    private cartService: ProductCartService,
    private menuCtrl: MenuController
  ) {
    effect(() => {
      this.cartItems = this.cartService.getCart();
      console.log('hola')
      this.calculateTotalItem()
    })
  }

  ngOnInit() {
    this.calculateTotalItem();
  }

  closeMenu() {
    this.menuCtrl.close('end'); // Cierra el menú lateral
  }

  calculateTotalItem() {
    this.subtotal = this.cartItems.reduce(
      (acc: any, item: Cart) => acc + item.product.price * item.quantity,
      0
    );
    this.tax = this.subtotal * this.taxRate;
    this.total = this.subtotal + this.tax;
  }

}
