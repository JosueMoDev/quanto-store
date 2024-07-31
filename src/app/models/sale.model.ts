import { Timestamp } from "firebase/firestore";
import { Product } from "./product.model";
import { User } from "./user.model";
export type PartialUser = Partial<Pick<User, 'id' | 'email' | 'displayName'>>;

export interface SaleOptions {
  id: string;
  user: PartialUser ;
  cartDetails: { product:Product, quantity: number }[];
  createdAt: Timestamp;
  total: number,
  tax: number,
  subTotal: number
}
export class Sale {
  public id: string;
  public user: PartialUser;
  public cartDetails: { product: Product; quantity: number }[];
  public createdAt: Timestamp;
  public total: number;
  public tax: number;
  public subTotal: number;

  constructor(options: SaleOptions) {
    this.id = options.id;
    this.user = options.user;
    this.cartDetails = options.cartDetails;
    this.createdAt = options.createdAt;
    this.total = options.total;
    this.tax = options.tax;
    this.subTotal = options.subTotal;
  }
}
