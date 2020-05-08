import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../shared/services/category.service';
import {Category} from '../../shared/interfeices';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {

  constructor(private categoryService: CategoryService,
              private toastrService: ToastrService) { }

  categories: Category[] = [];
  loading = false;

  ngOnInit() {
    this.loading = true;
    this.categoryService.fetch().subscribe( categories => {
      this.categories = categories;
      this.loading = false;
    });
  }

  addNewCategory(event) {
    this.categoryService.createCategory(event).subscribe( result => {
      if (result.status === true) {
        this.toastrService.success(result.message);
        this.categories.push(event);
      } else {
        this.toastrService.warning(result.message);
      }
    });
  }


  removeCategory(category: Category) {
    const qwerty  = Number(prompt('Если вы хотите удалить категорию пропишите - 1'));
    if (qwerty === 1 ) {
      this.categoryService.removeCategory(category._id).subscribe( result => {
        if (result.status === true) {
          this.categories.splice(this.categories.indexOf(category), 1);
          this.toastrService.success(`${category.name}  ${result.message}`);
        }
      });
    } else {
      this.toastrService.warning(`Что то пошло не так, попробуйте еще раз!`);
    }
  }


}
