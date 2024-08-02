import { Component, effect, inject } from '@angular/core';
import { ProductModalComponent } from '@components/product-modal/product-modal.component';
import { IonicModule, ModalController } from '@ionic/angular';
import { AlertController, ToastController } from '@ionic/angular/standalone';
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
  readonly #toastController = inject(ToastController);

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

  async changeProductState(product: Product) {
    try {
      this.#productsService.changeProductState(product);
      const toast = await this.#toastController.create({
        message: `Product ${ product.state ? 'disable' : 'enable'} successfully!`,
        duration: 2000,
        color: 'success',
      });
      await toast.present();
    } catch (error) {
       const toast = await this.#toastController.create({
         message: 'Error while we try to change product state',
         duration: 2000,
         color: 'danger',
       });
       await toast.present();
    }
  }
  async confirmDeleteAlert({ id, photoUrl, name }: Product) {
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
            this.deleteProductById(id, photoUrl);
          },
          cssClass: 'alert-button-confirm',
        },
      ],
    });
    await alert.present();
  }
  async deleteProductById(id: string, photoUrl: string) {
    try {
      this.#productsService.deleteProductById(id, photoUrl);
      const toast = await this.#toastController.create({
        message: 'Product successfully deleted',
        duration: 2000,
        color: 'success',
      });
      await toast.present();
    } catch (error) {
      const toast = await this.#toastController.create({
        message: 'Error while we try to delete product',
        duration: 2000,
        color: 'danger',
      });
      await toast.present();
    }
  }
}
