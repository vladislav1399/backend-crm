import { Component, OnInit } from '@angular/core';
import {Purchase, Supplier} from '../shared/interfeices';
import {PurchaseService} from '../shared/services/purchase.service';
import {SupplierService} from '../shared/services/supplier.service';
import {StaticDateFinanceService} from '../finance-page/date.finance.service';

@Component({
  selector: 'app-purchase-page',
  templateUrl: './purchase-page.component.html',
  styleUrls: ['./purchase-page.component.css'],
  providers: [StaticDateFinanceService]
})
export class PurchasePageComponent implements OnInit {

  constructor(private purchaseService: PurchaseService,
              private supplierService: SupplierService
              ) { }

  purchases: Purchase[] = [];
  purchasesRef: Purchase[] = [];
  warehouseNow: string;
  suppliers: Supplier[] = [];
  loading = false;

  ngOnInit() {
    this.loading = true;
    this.warehouseNow = localStorage.getItem('warehouseNow');
    this.purchaseService.fetchPurchase(this.warehouseNow).subscribe(
      purchases => {
        this.purchases = purchases;
        this.purchasesRef = purchases;
        this.supplierService.fetchSupplier().subscribe( suppliers => {
            this.suppliers = suppliers;
            this.loading = false;
        });
      });
  }

  changeFilter(event) {
      this.loading = true;
      this.purchaseService.getPurchaseForDate(this.warehouseNow, event.dateOt, event.dateDo).subscribe( purchases => {
        this.purchasesRef = purchases;
        this.purchases = this.purchasesRef;
        this.loading = false;
    });
  }

  changeDateFilter(event) {
    this.loading = true;
    this.purchaseService.getPurchaseForDate(this.warehouseNow, event.dateOt, event.dateDo ).subscribe( purchases => {
      this.purchasesRef = purchases;
      this.purchases = this.purchasesRef;
      this.loading = false;
    });
  }

  changeStatusPurchase(event) {
    this.loading = true;
    this.purchases = this.purchasesRef.filter(purchase => purchase.status === event);
    this.loading = false;
  }

  checkSupplierFilter(event) {
    this.loading = true;
    this.purchases = this.purchasesRef.filter(purchase => purchase.supplier._id === event);
    this.loading = false;
  }

}
