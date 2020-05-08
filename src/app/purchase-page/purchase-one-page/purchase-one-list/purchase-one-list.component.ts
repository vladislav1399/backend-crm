import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product, PurchaseProduct} from '../../../shared/interfeices';
import {PurchaseHomeService} from '../../purchases.service';

@Component({
  selector: 'app-purchase-one-list',
  templateUrl: './purchase-one-list.component.html',
  styleUrls: ['./purchase-one-list.component.css'],
  providers: [PurchaseHomeService]
})
export class PurchaseOneListComponent implements OnInit {

  @Input() productsPurchase: PurchaseProduct[] = [];
  @Output() product: EventEmitter<PurchaseProduct> = new EventEmitter<PurchaseProduct>();
  @Output() allAmountCost: EventEmitter<number> = new EventEmitter<number>();
  @Output() addProductOfPurchase: EventEmitter<Product> = new EventEmitter<Product>();

  constructor(private purchaseHomeService: PurchaseHomeService) { }

  ngOnInit() {}

  changeCountProductPurchase(product: PurchaseProduct, event) {
    const countValue = Number(event.target.value);
    const purchaseProd = this.purchaseHomeService.changeCount(product, countValue, this.productsPurchase);
    this.productsPurchase = purchaseProd;
    this.allAmountCost.emit(this.purchaseHomeService.recalculationProduct(purchaseProd));
  }

  changePurchasePrice(product: PurchaseProduct, event) {
    const newPrice: number = event.target.value;
    product.pricePurchase = newPrice;
    this.allAmountCost.emit(this.purchaseHomeService.recalculationProduct(this.productsPurchase));
  }

  removeProduct(product: PurchaseProduct) {
    const candidate = this.productsPurchase.find( prod => prod.productId === product.productId);
    if (candidate) {
      this.productsPurchase.splice(this.productsPurchase.indexOf(product), 1);
      this.product.emit(product);
      this.allAmountCost.emit(this.purchaseHomeService.recalculationProduct(this.productsPurchase));
    }
  }

  addProduct(event: Product) {
      this.addProductOfPurchase.emit(event);
      this.allAmountCost.emit(this.purchaseHomeService.recalculationProduct(this.productsPurchase));
  }
}
