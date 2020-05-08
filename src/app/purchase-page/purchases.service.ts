import { Injectable } from '@angular/core';
import {PurchaseProduct} from '../shared/interfeices';


@Injectable()

export class PurchaseHomeService {
  private totalPrice: number;

  constructor() {}

  changeCount(product: PurchaseProduct, countValue: number, productsPurchase: PurchaseProduct[]): PurchaseProduct[] {
    // значение поля до изменения
    // количество до изменения
    const countPre = product.count;
    // новое количество
    const newCount = countValue;
    const candidate = productsPurchase.find( prod => prod.productId === product.productId);
    if (candidate) {
      candidate.count = newCount;
      candidate.amount = candidate.count * candidate.pricePurchase;
      if (countPre > newCount) {
        const newAmount = (countPre - newCount) * candidate.pricePurchase;
        this.totalPrice -= newAmount;
      } else if (countPre < newCount) {
        const newAmount = (newCount - countPre) * candidate.pricePurchase;
        this.totalPrice += newAmount;
      }
    }
    return productsPurchase;
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

  changePurchasePrice(product: PurchaseProduct, event: any, productsPurchase: PurchaseProduct[] ) {
    const newPrice: number = Number(event.target.value);
    const indexProduct = productsPurchase.indexOf(product);
    productsPurchase[indexProduct].pricePurchase = newPrice;
    return this.recalculationProduct(productsPurchase);
  }



}
