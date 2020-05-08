import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Balance, PurchaseProduct, Sale} from '../../../shared/interfeices';
import {PurchaseHomeService} from '../../purchases.service';

@Component({
  selector: 'app-purchase-list-products',
  templateUrl: './purchase-list-products.component.html',
  styleUrls: ['./purchase-list-products.component.css'],
  providers: [PurchaseHomeService]
})
export class PurchaseListProductsComponent implements OnInit, OnChanges {
  @Input() productsPurchase: PurchaseProduct[] = [];
  @Output() delProduct: EventEmitter<PurchaseProduct> = new EventEmitter<PurchaseProduct>();
  @Output() allAmountPrice: EventEmitter<number> = new EventEmitter<number>();
  @Input() sales: Sale[] = [];
  @Input() balances: Balance[] = [];
  @Input() totalPrice: number;

  constructor(private purchaseHomeService: PurchaseHomeService ) { }

  loading  = false;

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loading = true;
    for (const balance of this.balances) {
      balance.saleCount = 0;
      for (const sale of this.sales) {
        for ( let p = 0; p < sale.productsSale.length; p++) {
          if (String(balance.productId) === String(sale.productsSale[p].productId)) {
            balance.saleCount += sale.productsSale[p].count;
          }
        }
      }
    }
    this.loading = false;
  }


  removeProduct(product: any) {
    console.log(product);
    this.productsPurchase.splice(this.productsPurchase.indexOf(product), 1);
    this.delProduct.emit(product);

  }

  changeCount(product: PurchaseProduct, event) {
    const newValue: number = event.target.value;
    this.productsPurchase = this.purchaseHomeService.changeCount(product, newValue, this.productsPurchase);
    this.allAmountPrice.emit(this.purchaseHomeService.recalculationProduct(this.productsPurchase));
  }

  changePurchasePrice(product: PurchaseProduct, event) {
    console.log(product);
    const newPrice: number = Number(event.target.value);
    const indexProduct = this.productsPurchase.indexOf(product);
    this.productsPurchase[indexProduct].pricePurchase = newPrice;
    this.productsPurchase[indexProduct].amount = newPrice * this.productsPurchase[indexProduct].count;
    const totalPriceNew = this.recalculationProduct(this.productsPurchase);
    this.allAmountPrice.emit(totalPriceNew);
  }

  recalculationProduct(productsPurchase: PurchaseProduct[]): number {
    this.totalPrice = 0;
    for (const product of productsPurchase) {
            const newAmount = product.count * product.pricePurchase;
            product.amount = newAmount;
            this.totalPrice += newAmount;
    }
    return this.totalPrice;
  }


}
