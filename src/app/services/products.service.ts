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
  deleteDoc,
} from '@angular/fire/firestore';
import { firstValueFrom, map, Observable } from 'rxjs';
import { Product } from '@models/product.model';
import { UploadFileService } from '@services/upload-file.service';
type Filter = 'all' | 'active' | 'inactive';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  readonly #firestore = inject(Firestore);
  readonly #uploadFileService = inject(UploadFileService);
  #photoUrl!: string
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
    return this._productsList();
  }

  async createNewProduct({id,  photoUrl, ...rest }: Product, file: File) {
    this.#photoUrl = await this.#uploadFileService.uploadFileToFireStoreBucket(file);
    const productsCollection = collection(this.#firestore, 'products');
    const productSave = await addDoc(productsCollection, {...rest, photoUrl: this.#photoUrl });
    this.getAllProduct();
    return productSave;
  }

  async changeProductState({ id, state }: Product) {
    const productDoc = doc(this.#firestore, `products/${id}`);
    await updateDoc(productDoc, { state: !state });
    this.getAllProduct()
  }

  async updateProduct({ id, state, photoUrl, ...rest }: Product, file?: File) {
    this.#photoUrl = photoUrl;
    if (file) {
      this.#photoUrl = await this.#uploadFileService.uploadFileToFireStoreBucket(file);
    }
    const productDoc = doc(this.#firestore, `products/${id}`);
    await updateDoc(productDoc, {...rest, photoUrl: this.#photoUrl});
    this.getAllProduct();
  }

  async deleteProductById(id: string, photoUrl: string) {
    console.log(id, photoUrl)
    await this.#uploadFileService.deleteFileFromFireStoreBucket(photoUrl)
    await deleteDoc(doc(this.#firestore, 'products', id));
    this.getAllProduct();
  }

}
