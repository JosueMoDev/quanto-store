import { Component, effect, inject } from '@angular/core';
import { ProductModalComponent } from '@components/product-modal/product-modal.component';
import { IonicModule, ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular/standalone';
import { Product } from '@models/product.model';
import { ProductsService } from '@services/products.service';
import { addIcons } from 'ionicons';
import { eyeOffOutline, eyeOutline, pencilOutline, trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-product-actions',
  templateUrl: './product-actions.component.html',
  styleUrls: ['./product-actions.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export default class ProductActionsComponent {
  readonly #productsService = inject(ProductsService);
  readonly #modalController = inject(ModalController);
  readonly #alertController = inject(AlertController);
  alertButtons = ['Action'];
  products!: Product[] | [];
  constructor() {
    this.#productsService.getAllProduct('all');
    effect(() => {
      this.products = this.#productsService._productsList();
    });
    addIcons({ eyeOutline, eyeOffOutline, pencilOutline, trashOutline });
  }

  async openEditModal(product: Product) {
    const modal = await this.#modalController.create({
      component: ProductModalComponent,
      componentProps: { product },
    });
    return await modal.present();
  }

  changeProductState(product: Product) {
    this.#productsService.changeProductState(product);
  }
  async confirmDeleteAlert(id: string, name: string) {
    const alert = await this.#alertController.create({
      header: `Are you sure do you want to delete "${name}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'Yes, delete',
          handler: () => {
            this.deleteProductById(id);
          },
          cssClass: 'alert-button-confirm',
        },
      ],
    });
    await alert.present();
  }
  deleteProductById(id: string) {
    this.#productsService.deleteProductById(id);
  }
}
