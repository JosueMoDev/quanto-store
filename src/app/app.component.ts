import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { addIcons } from 'ionicons';
import { basketOutline, basketSharp, cartOutline, cashOutline, cashSharp, logOutOutline, menuOutline } from 'ionicons/icons';
import { ProductCartComponent } from './components/product-cart/product-cart.component';
import { IonicModule } from '@ionic/angular';
import { AuthenticationService } from '@services/authentication.service';
import { User } from '@models/user.model';
import { CheckoutDetails, ProductCartService } from 'src/app/services/product-cart.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    ProductCartComponent,
    IonicModule,
  ],
})
export class AppComponent {
  readonly #authenticationService = inject(AuthenticationService);
  readonly #cartService = inject(ProductCartService);

  cartCounter!: number;
  userAuthenticated!: User | null;
  checkoutDetails!: CheckoutDetails;

  public appPages = [
    { title: 'Products', url: '/home/products', icon: 'basket' },
    { title: 'Sales', url: '/home/sales', icon: 'cash' },
  ];

  constructor() {
    addIcons({
      cartOutline,
      basketOutline,
      basketSharp,
      cashOutline,
      cashSharp,
      logOutOutline,
      menuOutline,
    });

    effect(() => {
      this.userAuthenticated = this.#authenticationService.getCurrentUserLogged();
      this.checkoutDetails = this.#cartService.getCheckoutDetails();
    });
  }
  logout() {
    this.#authenticationService.logout();
  }
}
