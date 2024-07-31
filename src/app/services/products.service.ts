import { inject, Injectable, signal } from '@angular/core';
import {
  collection,
  collectionData,
  Firestore,
  addDoc,
  doc,
  updateDoc,
  CollectionReference,
  DocumentData,
  query,
  where,
  Query,
} from '@angular/fire/firestore';
import { firstValueFrom, map, Observable } from 'rxjs';
import { Product } from '@models/product.model';
type Filter = 'all' | 'active' | 'inactive';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  readonly #firestore = inject(Firestore);
  _productsList = signal<Product[] | []>([]);
  #getProductsQuery!:
    | CollectionReference<DocumentData>
    | Query<DocumentData>;

  async getAllProduct(sort?: Filter): Promise<Product[]> {
    this.#getProductsQuery = collection(this.#firestore, 'products');
    if (sort === 'active') {
      this.#getProductsQuery = query(
        this.#getProductsQuery,
        where('state', '==', true)
      );
    }
    
    const productsObservable: Observable<Product[]> = collectionData(
      this.#getProductsQuery,
      { idField: 'id' }
    ).pipe(map((data) => data as Product[]));
    const productsList = await firstValueFrom(productsObservable);
    this._productsList.set(productsList);
    return productsList;
  }

  async createNewProduct(product: Product) {
    const productsCollection = collection(this.#firestore, 'products');
    const productSave = await addDoc(productsCollection, product);
    console.log(productSave);
    this.getAllProduct();
    return productSave;
  }

  async changeProductState({ id, state }: Product) {
    const productDoc = doc(this.#firestore, `products/${id}`);
    await updateDoc(productDoc, { state: !state });
    this.getAllProduct()
  }

  async updateProduct(product: Product) {
    const { id, state, ...rest } = product;
    const productDoc = doc(this.#firestore, `products/${id}`);
    await updateDoc(productDoc, rest);
    this.getAllProduct();
  }
}
