import {  inject, Injectable, signal } from '@angular/core';
import { collection, collectionData, Firestore , addDoc} from '@angular/fire/firestore';
import { firstValueFrom, map, Observable } from 'rxjs';
import { Product } from '@models/product.model';


@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly firestore = inject(Firestore);

  _productsList = signal<Product[] | []>([]);

  async getAllProduct(): Promise<Product[]> {
    const productsCollection = collection(this.firestore, 'products');
    const productsObservable: Observable<Product[]> = collectionData(
      productsCollection,
      { idField: 'id' }
    ).pipe(map((data) => data as Product[]));
    const productsList = await firstValueFrom(productsObservable);
    this._productsList.set(productsList);
    return productsList;
  }

  async createNewProduct(product: Product) {
    const productsCollection = collection(this.firestore, 'products');
    const productSave = await addDoc(productsCollection, product);
    console.log(productSave)
    this.getAllProduct();
    return productSave;
  }
}
