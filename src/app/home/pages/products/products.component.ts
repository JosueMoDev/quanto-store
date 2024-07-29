import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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
export default class ProductsComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  public modalController = inject(ModalController);
  products: Product[] | [] = [];
  async ngOnInit() {
    this.products = await this.productsService.getAllProduct();
    
  }

  async openProductModal() {
    const modal = await this.modalController.create({
      component: ProductModalComponent,
    });
    return await modal.present();
  }
}
