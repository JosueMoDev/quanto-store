export interface ProductOptions {
  id: string;  
  name: string;
  photoUrl: string;
  state: boolean;
  price: number;
}
export class Product {
  public id: string;  
  public name: string;
  public photoUrl: string;
  public state: boolean;
  public price: number;

  constructor(options: ProductOptions) {
    this.id = options.id;
    this.name = options.name;
    this.photoUrl = options.photoUrl;
    this.state = options.state;
    this.price = options.price;
 
  }
}
