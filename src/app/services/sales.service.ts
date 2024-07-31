import { Injectable, inject, signal } from '@angular/core';
import { CheckoutDetails, ProductCartService } from './product-cart.service';
import { AuthenticationService } from './authentication.service';
import { DocumentReference, Firestore, addDoc, collection, Timestamp, collectionData } from '@angular/fire/firestore';
import { Sale } from '@models/sale.model';
import { firstValueFrom, map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class SalesService {
  #firestore = inject(Firestore);
  readonly #authenticationService = inject(AuthenticationService);
  readonly #cartService = inject(ProductCartService);
  readonly #user = this.#authenticationService.getCurrentUserLogged();
  readonly _salesList = signal<Sale[]>([]);

  async createNewSale({
    total,
    tax,
    subTotal,
    cartItems,
  }: CheckoutDetails): Promise<DocumentReference> {
    const salesCollection = collection(this.#firestore, 'sales');
    this.#cartService.clearCheckoutDetails();
    return await addDoc(salesCollection, {
      total,
      tax,
      subTotal,
      cartDetails: cartItems,
      user: this.#user,
      createdAt: Timestamp.now(),
    });
  }

  async getAllSales(): Promise<Sale[]> {
    const salesCollection = collection(this.#firestore, 'sales');
   const productsObservable: Observable<Sale[]> = collectionData(
     salesCollection,
     { idField: 'id' }
   ).pipe(map((data) => data as Sale[]));
    const data = await firstValueFrom(productsObservable);
    const salesList = data.map((sale) => new Sale(sale)) 
    this._salesList.set(salesList);
    return salesList;
  }

 
}
