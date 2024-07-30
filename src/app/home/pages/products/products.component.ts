import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';
import { ProductModalComponent } from '@components/product-modal/product-modal.component';
import { ProductComponent } from '@components/product/product.component';
import { Product } from '@models/product.model';
import { ProductsService } from '@services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  standalone: true,
  styleUrls: ['./products.component.scss'],
  imports: [ProductComponent, CommonModule, IonicModule],
})
export default class ProductsComponent {
  private readonly productsService = inject(ProductsService);
  public modalController = inject(ModalController);
  products: Product[] | [] = [];
  
  constructor() {
    this.productsService.getAllProduct();
    effect(() => {
      this.products = this.productsService._productsList();
    });
  }

  async openProductModal() {
    const modal = await this.modalController.create({
      component: ProductModalComponent,
    });
    return await modal.present();
  }
  
}
