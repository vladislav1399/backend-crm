import { Pipe, PipeTransform } from '@angular/core';
import {Balance} from '../interfeices';

@Pipe({
  name: 'balanceFilter'
})
export class BalanceFilterPipe implements PipeTransform {

  transform(balances: Balance[] = [], searchProductOfBalance: string, fieldName: string): Balance[] {
    if (balances.length === 0 || searchProductOfBalance === '') {
      return balances;
    }
    return balances.filter(balance => balance.productId[fieldName].toLowerCase().indexOf(searchProductOfBalance.toLowerCase()) !== -1);
  }

}
