import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductComponent } from 'src/app/components/product/product.component';
import { Product } from 'src/app/models/product.model';
import { FireBaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  standalone: true,
  styleUrls: ['./products.component.scss'],
  imports: [ProductComponent, CommonModule],
})
export default class ProductsComponent implements OnInit {
  constructor( private fireBaseService: FireBaseService){}
  products!: Product[];
  async ngOnInit() {
    this.products = await this.fireBaseService.getAllProduct();
    console.log(JSON.stringify(this.products));
  }
}
