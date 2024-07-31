import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { ProductModalComponent } from '@components/product-modal/product-modal.component';
import { ProductComponent } from '@components/product/product.component';
import { Product } from '@models/product.model';
import { ProductsService } from '@services/products.service';
import { addIcons } from 'ionicons';
import { addOutline, optionsOutline, removeOutline } from 'ionicons/icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  standalone: true,
  styleUrls: ['./products.component.scss'],
  imports: [ProductComponent, CommonModule, IonicModule, RouterLink],
})
export default class ProductsComponent  {
  readonly #productsService = inject(ProductsService);
  readonly #modalController = inject(ModalController);
  products: Product[]  = [];
  
  constructor() {
    this.#productsService.getAllProduct('active');
    effect(() => {
      this.products = this.#productsService._productsList();
    });
    addIcons({addOutline, optionsOutline, removeOutline})
  }
 
  async openProductModal() {
    const modal = await this.#modalController.create({
      component: ProductModalComponent,
      
    });
    return await modal.present();
  }
  
}
