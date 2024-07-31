import { Component, effect, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CheckoutDetails, ProductCartService } from '@services/product-cart.service';
import { SalesService } from '@services/sales.service';
import { ModalController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-checkout-modal',
  templateUrl: './checkout-modal.component.html',
  styleUrls: ['./checkout-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class CheckoutModalComponent {
  readonly #cartService = inject(ProductCartService);
  readonly #salesService = inject(SalesService);
  readonly #modalController = inject(ModalController);

  checkoutDetails!: CheckoutDetails;
  constructor() {
    this.checkoutDetails = this.#cartService.getCheckoutDetails();
    effect(() => {});
  }

  async payCart() {
    await this.#salesService.createNewSale(this.checkoutDetails);
    await this.#modalController.dismiss();
  }
}
