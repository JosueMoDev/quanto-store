import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Sale } from '@models/sale.model';

@Component({
  selector: 'app-show-sale-datail-modal',
  templateUrl: './show-sale-datail-modal.component.html',
  styleUrls: ['./show-sale-datail-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class ShowSaleDatailModalComponent implements OnInit{
  @Input() saleDatail!: Sale;
 
  ngOnInit(): void {
    this.saleDatail;  
  }
}
