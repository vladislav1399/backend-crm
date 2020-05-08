import { Pipe, PipeTransform } from '@angular/core';
import {Category} from '../interfeices';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {
  transform(categories: Category[] = [], searchCategory: string, fieldName: string): Category[] {
    console.log('filter started');
    if (categories.length === 0 || searchCategory === '') {
          return categories;
    }
    return categories.filter(category => category[fieldName].toLowerCase().indexOf(searchCategory.toLowerCase()) !== -1);
  }

}
