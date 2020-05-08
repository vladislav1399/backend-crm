import { Component, OnInit } from '@angular/core';
import {SaleService} from '../shared/services/sale.service';
import {Sale} from '../shared/interfeices';

@Component({
  selector: 'app-sale-page',
  templateUrl: './sale-page.component.html',
  styleUrls: ['./sale-page.component.css']
})
export class SalePageComponent implements OnInit {

  constructor(private saleService: SaleService) { }

  sales: Sale[] = [];
  loading = false;
  warehouseId = localStorage.getItem('warehouseNow');
  dateDo: any;
  dateOt: any;

  ngOnInit() {
    this.loading = true;
    this.saleService.fetchSaleFromWarehouse(this.warehouseId).subscribe( sales => {
            this.sales = sales;
            console.log(sales);
            this.loading = false;
    });
  }

  changeFilter(event) {

  }

  changeStatusPurchase(event) {

  }

  selectFilterSupplier($event: Event) {

  }

  changeDate() {

  }
}
