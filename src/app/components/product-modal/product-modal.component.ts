import { Component, inject } from '@angular/core';
import { addDoc, collection, Firestore} from '@angular/fire/firestore';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule],
})
export class ProductModalComponent {
  private readonly firestore = inject(Firestore);
  public modalController = inject(ModalController);
  
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

  async onSubmit() {
    if (this.productForm.valid) {
      const { name, price, photoUrl, state } = this.productForm.value;

      try {
        const productsCollection = collection(this.firestore, 'products');
        await addDoc(productsCollection, { name, price, photoUrl, state });
        this.modalController.dismiss();
      } catch (error) {
        console.error('Error adding product: ', error);
      }
    }
  }
}
