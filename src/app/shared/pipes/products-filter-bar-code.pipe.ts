import { Pipe, PipeTransform } from '@angular/core';
import {Product} from '../interfeices';

@Pipe({
  name: 'productsFilterBarCode'
})
export class ProductsFilterBarCodePipe implements PipeTransform {
  transform(products: Product[] = [], searchProduct: string, fieldName: string): Product[] {
    if (products.length === 0 || searchProduct === '') {
      return products;
    }
    console.log(fieldName)
    return products.filter(product => String(product[fieldName]).toLowerCase().indexOf(String(searchProduct).toLowerCase()) !== -1);
  }

}
