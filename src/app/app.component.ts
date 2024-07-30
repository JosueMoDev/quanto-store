import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { addIcons } from 'ionicons';
import { basketOutline, basketSharp, cartOutline, cashOutline, cashSharp, logOutOutline } from 'ionicons/icons';
import { ProductCartComponent } from './components/product-cart/product-cart.component';
import { IonicModule } from '@ionic/angular';
import { AuthenticationService } from '@services/authentication.service';
import { User } from '@models/user.model';

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
  userAuthenticated!: User | null;
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
    });

    effect(() => {
      this.userAuthenticated = this.#authenticationService._currentUserLogged();
    });
  }
  logout() {
    this.#authenticationService.logout();
  }
}
