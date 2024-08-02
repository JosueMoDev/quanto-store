import { Component, effect, inject, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalController, ToastController } from '@ionic/angular/standalone';
import { Product } from '@models/product.model';
import { ProductsService } from '@services/products.service';
import { UploadFileService } from '@services/upload-file.service';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule],
})
export class ProductModalComponent implements OnInit {
  @Input() product!: Product;
  readonly #modalController = inject(ModalController);
  readonly #productsService = inject(ProductsService);
  readonly #formBuilder = inject(FormBuilder);
  readonly #uploadFileService = inject(UploadFileService);
  readonly #toastController = inject(ToastController);

  public productForm!: FormGroup;
  public fileSelected!: File | undefined;
  public progressBarIndicator: number = 0;
  constructor() {
    effect(() => {
      this.progressBarIndicator = this.#uploadFileService.uploadProgress();
    });
  }
  ngOnInit(): void {
    this.productForm = this.#formBuilder.group({
      id: [this.product?.id ?? undefined],
      name: [this.product?.name ?? '', Validators.required],
      price: [
        this.product?.price ?? null,
        [Validators.required, Validators.min(0)],
      ],
      photoUrl:[this.product?.photoUrl ?? null],
      state: [this.product?.state ?? true],
    });
  }
  close() {
    this.#modalController.dismiss();
  }

  async onSubmit() {
    if (this.productForm.valid) {
      try {
        if (this.product) {
          await this.#productsService.updateProduct(this.productForm.value, this.fileSelected);
        }
        if (!this.product) {
          await this.#productsService.createNewProduct(
            this.productForm.value,
            this.fileSelected!
          );
        }
        const toast = await this.#toastController.create({
          message: `Product successfully ${this.product?.id ? 'updated' : 'created'}!`,
          duration: 2000,
          color: 'success',
        });
        await toast.present();
       
      } catch (error) {
        const toast = await this.#toastController.create({
          message: `Product ${this.product.id ? 'updated' : 'created'} error!`,
          duration: 2000,
          color: 'danger',
        });
        await toast.present();
      }
      this.fileSelected = undefined;
      this.productForm.reset()
      this.close();

    }
  }

  onSelectedFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file) {
        this.fileSelected = file;
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          this.productForm.get('photoUrl')?.setValue(e.target!.result as string)
        };
        reader.readAsDataURL(file);
      }
    }
  }
}
