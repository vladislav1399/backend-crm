import { Pipe, PipeTransform } from '@angular/core';
import {Product} from '../interfeices';

@Pipe({
  name: 'productsFilter'
})
export class ProductsFilterPipe implements PipeTransform {
  transform(products: Product[] = [], searchProduct: string, fieldName: string): Product[] {
      if (products.length === 0 || searchProduct === '') {
          return products;
      }
      return products.filter(product => product[fieldName].toLowerCase().indexOf(searchProduct.toLowerCase()) !== -1);
  }

}
