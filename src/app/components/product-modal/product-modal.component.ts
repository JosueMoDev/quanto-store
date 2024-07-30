import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';
import { Product } from '@models/product.model';
import { ProductsService } from '@services/products.service';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule],
})
export class ProductModalComponent implements OnInit {
  @Input() product!: Product;
  public modalController = inject(ModalController);
  private productsService = inject(ProductsService);
  private formBuilder = inject(FormBuilder);
  public productForm!: FormGroup;
  
  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      id: [this.product?.id ?? undefined],
      name: [this.product?.name ?? '', Validators.required],
      price: [
        this.product?.price ?? 0,
        [Validators.required, Validators.min(0)],
      ],
      photoUrl: [this.product?.photoUrl ?? '', Validators.required],
      state: [this.product?.state ?? true],
    });
  }
  close() {
    this.modalController.dismiss();
  }

  onSubmit() {
    if (this.productForm.valid) {
      try {
        if (this.product) {
          this.productsService.updateProduct(this.productForm.value);
        }
        if (!this.product) {
          this.productsService.createNewProduct(this.productForm.value);
        }
        this.close();
      } catch (error) {
        console.error('Error adding product: ', error);
      }
    }
  }
}
