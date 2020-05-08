import {Injectable} from '@angular/core';
import {Client, SaleProduct} from '../shared/interfeices';

@Injectable()

export class SaleHomeService {
    private totalPrice: number;
    clientDiscount = 0;
    client: any;
    productsSale: SaleProduct[] = [];
    productsSaleForRegularPrice: SaleProduct[] = [];

  addToCart(product) {
    const candidate = this.productsSale.find(p => p.productId === product.productId);
    if (candidate) {
      if (this.clientDiscount === 0) {
        candidate.discount = product.discount;
      } else {
        candidate.discount = this.clientDiscount;
      }
      candidate.count += 1;
      candidate.amount += product.priceSale / 100 * (100 - candidate.discount);
      this.totalPrice += product.priceSale / 100 * (100 -  candidate.discount);
    } else {
      product.amount = product.priceSale;
      product.discount = this.clientDiscount;
      this.productsSale.push(product);
      this.totalPrice += product.priceSale;
    }
    return this.productsSale;
  }

  removeSaleDiscount(productsSale: SaleProduct[]): SaleProduct[] {
        for (const product of productsSale) {
          product.discount = 0;
          product.discountAmount = 0;
        }
        this.productsSale = productsSale;
        return productsSale;
  }

  changeDiscount(product: SaleProduct, value: number, productsSale: SaleProduct[]) {
    const candidate = productsSale.find( p => p.productId === product.productId);
    if (candidate) {
      const fullAmount = candidate.priceSale * candidate.count;
      candidate.discount = 0;
      candidate.discount += Number(value);
      candidate.amount = fullAmount;
      candidate.discountAmount = fullAmount / 100 * candidate.discount;
      }
    this.productsSale = productsSale;
    return productsSale;
  }



  changeCountSale(product: SaleProduct, countValue: number, productsSale: SaleProduct[]): SaleProduct[] {
    // новое количество
    const newCount = countValue;
    const candidate = productsSale.find( prod => prod.productId === product.productId);
    if (candidate) {
      candidate.count = newCount;
      candidate.amount = candidate.count * candidate.priceSale;
      if (product.count > newCount) {
        const newAmount = (product.count - newCount) * candidate.priceSale;
        this.totalPrice -= newAmount;
      } else if (product.count < newCount) {
        const newAmount = (newCount - product.count) * candidate.priceSale;
        this.totalPrice += newAmount;
      }
    }
    this.productsSale = productsSale;
    return productsSale;
  }

  changeSalePrice(product: SaleProduct, event: any, productsSale: SaleProduct[] ) {
    const newPrice: number = Number(event.target.value);
    const indexProduct = productsSale.indexOf(product);
    productsSale[indexProduct].priceSale = newPrice;
    productsSale[indexProduct].amount = newPrice * productsSale[indexProduct].count;
    this.productsSale = productsSale;
    return productsSale;
  }

  recalculationProductSale(productsSale: SaleProduct[]): number {
    this.totalPrice = 0;
    for (const product of productsSale) {
      const newAmount = product.count * product.priceSale;
      product.discountAmount = Number((newAmount / 100 * product.discount).toFixed(2));
      product.amount = newAmount / 100 * (100 - product.discount);
      this.totalPrice += product.amount;
      this.productsSale = productsSale;
    }
    return this.totalPrice;
  }

  getClientForSale(clientId: string, clients: Client[]) {
    let surnameClient = '';
    for (const letter of clientId ) {
      if  (letter === ' ') {
        surnameClient = clientId.slice(0, clientId.indexOf(letter));
        this.client = clients.find(c => c.surname === surnameClient);
        this.clientDiscount = this.client.discount;
        return this.client;
      }
    }
  }

  applyDiscountClient(discount: number, productsSale: SaleProduct[]) {
    this.clientDiscount = discount;
    for (const product of productsSale) {
                product.discount = discount;
                const amountNoDiscount = product.priceSale * product.count;
                product.discountAmount = amountNoDiscount / 100 * discount;
          }
   this.productsSale = productsSale;
    return productsSale;
      }


  saveProductsSale(productsSale: SaleProduct[]) {
    this.productsSale = productsSale;
    return productsSale;
  }

  deleteProduct(product) {
    this.productsSale.splice(this.productsSale.indexOf(product), 1);
    this.productsSaleForRegularPrice.splice(this.productsSaleForRegularPrice.indexOf(product), 1);

    return this.productsSale;
  }

  getDiscountAmount(productsSale: SaleProduct[]): number {
    this.productsSale = productsSale;
    let discountAmount = 0;
    for (const product of productsSale) {
      discountAmount += product.count * product.priceSale / 100 * product.discount;
    }
    return discountAmount;
  }

  getPrimaryAmountSale(productsSale: SaleProduct[]) {
    let total = 0;
    for (const product of productsSale) {
      total += product.priceSale * product.count;
    }
    return total;
  }

  saveLocalStorageProductsSale(productsSale: SaleProduct) {
      localStorage.setItem('lastProductsSale', JSON.stringify(productsSale));
  }

  getProductsFromStorage() {
    return localStorage.getItem('lastProductsSale');
  }









}

