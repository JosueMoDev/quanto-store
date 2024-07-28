import {  Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { firstValueFrom, map, Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class FireBaseService {
  constructor(private firestore: Firestore){}
  async getAllProduct(): Promise<Product[]> {
   const productsCollection = collection(this.firestore, 'products');
   const productsObservable: Observable<Product[]> = collectionData(
     productsCollection,
     { idField: 'id' }
   ).pipe(map((data) => data as Product[]));
   return await firstValueFrom(productsObservable);
  }
}
