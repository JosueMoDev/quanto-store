import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';
import { ProductsService } from '@services/products.service';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule],
})
export class ProductModalComponent {
  public modalController = inject(ModalController);
  private productsService = inject(ProductsService)
  private formBuider = inject(FormBuilder);
  public productForm: FormGroup = this.formBuider.group({
    name: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    photoUrl: ['', Validators.required],
    state: [true],
  });

  

  close() {
    this.modalController.dismiss();
  }

  onSubmit() {
    if (this.productForm.valid) {
      try {
        this.productsService.createNewProduct(this.productForm.value)
        this.close();
      } catch (error) {
        console.error('Error adding product: ', error);
      }
    }
  }
}
