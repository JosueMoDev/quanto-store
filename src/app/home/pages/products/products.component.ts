import { Component, OnInit } from '@angular/core';
import { ProductComponent } from 'src/app/components/product/product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  standalone: true,
  styleUrls: ['./products.component.scss'],
  imports:[ProductComponent]
})
export default class ProductsComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
