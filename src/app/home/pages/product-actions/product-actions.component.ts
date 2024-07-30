import { Component, effect, inject } from '@angular/core';
import { ProductModalComponent } from '@components/product-modal/product-modal.component';
import { IonicModule, ModalController } from '@ionic/angular';
import { Product } from '@models/product.model';
import { ProductsService } from '@services/products.service';
import { addIcons } from 'ionicons';
import { eyeOffOutline, eyeOutline, pencilOutline } from 'ionicons/icons';

@Component({
  selector: 'app-product-actions',
  templateUrl: './product-actions.component.html',
  styleUrls: ['./product-actions.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export default class ProductActionsComponent {
  private readonly productsService = inject(ProductsService);
  public modalController = inject(ModalController);
  products!: Product[] | [];
  
  constructor() {
    this.productsService.getAllProduct('all');
    effect(() => {
      this.products = this.productsService._productsList();
    });
    addIcons({eyeOutline, eyeOffOutline, pencilOutline})
  }

  async openEditModal(product: Product) {
    const modal = await this.modalController.create({
      component: ProductModalComponent,
      componentProps: { product },
    });
    return await modal.present();
  }

  changeProductState(product: Product) {
    this.productsService.changeProductState(product);
  }
}
