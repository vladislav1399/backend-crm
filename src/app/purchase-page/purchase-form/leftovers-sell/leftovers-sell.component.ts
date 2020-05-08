import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Balance, Category, PurchaseProduct} from '../../../shared/interfeices';

@Component({
  selector: 'app-leftovers-sell',
  templateUrl: './leftovers-sell.component.html',
  styleUrls: ['./leftovers-sell.component.css']
})
export class LeftoversSellComponent implements OnInit {
  @Input() categories: Category[] = [];
  @Input() balances: Balance[] = [];
  @Input() loading: boolean;
  @Output() categoryId: EventEmitter<string> = new EventEmitter<string>();
  @Output() productPurchase: EventEmitter<PurchaseProduct> = new EventEmitter<PurchaseProduct>();
  searchCategory = '';

  constructor() { }

  ngOnInit() {
    this.loading = this.balances.length <= 0;
    this.loading = false;
  }

  addToCart(product: any) {
    const purchaseProduct: PurchaseProduct = {
      productId: product._id,
      name: product.name,
      pricePurchase: product.purchasePrice,
      count: 1,
      amount: Number(product.purchasePrice.toFixed(2))
    };
    this.productPurchase.emit(purchaseProduct);
  }

  filterCategory(event) {
    console.log(event.target.value);
    this.categoryId.emit(event.target.id);
  }
}
