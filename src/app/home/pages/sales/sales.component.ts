import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit } from '@angular/core';
import { ShowSaleDatailModalComponent } from '@components/show-sale-datail-modal/show-sale-datail-modal.component';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';
import { Sale } from '@models/sale.model';
import { SalesService } from '@services/sales.service';
import { addIcons } from 'ionicons';
import { receiptOutline } from 'ionicons/icons';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export default class SalesComponent   {
  readonly #salesService = inject(SalesService);
  readonly #modalController = inject(ModalController);
  saleList!: Sale[]
  constructor() { 
    this.#salesService.getAllSales();
    addIcons({
      receiptOutline,
    })
    effect(() => {
      this.saleList = this.#salesService._salesList();
      
    })
  }

  async showSaleDetails(saleDatail: Sale) {
       const modal = await this.#modalController.create({
         component: ShowSaleDatailModalComponent,
         componentProps: { saleDatail },
       });
       return await modal.present();
  }

}
