import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../../shared/services/category.service';
import {Category} from '../../../shared/interfeices';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-one-category-page',
  templateUrl: './one-category-page.component.html',
  styleUrls: ['./one-category-page.component.css']
})
export class OneCategoryPageComponent implements OnInit {

  constructor(private categoryService: CategoryService,
              private route: ActivatedRoute,
              private toastrService: ToastrService,
              private router: Router
  ) { }

  categories: Category[] = [];
  category: Category;
  loading = false;
  categoryName = '';
  candidate: any;
  parentCategories: [{ nameParent: any, parent: string }];


  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe( params => {
      this.categoryService.fetchCategoryById(params.id).subscribe( category => {
        this.category = category;
        this.categoryName = this.category.name;
        this.categoryService.fetch().subscribe( categories => {
          this.categories = categories;
        });
        this.loading = false;
      });
    });
  }

  changeCategory(event) {
    this.candidate = this.categories.find(cat => String(cat._id) === String(event.target.value));
    if (this.candidate) {
      this.parentCategories = [{
        nameParent: this.candidate.name,
        parent: this.candidate._id},
      ];
    } else if (!this.candidate) {
      this.parentCategories = [{
        nameParent: null,
        parent: null},
      ];
    }
  }

  updateCategory() {
    if (this.parentCategories === undefined || this.parentCategories === null) {
        this.parentCategories = [{ nameParent: null, parent: null }];
    }
    const updateInfo: Category = {
        _id: this.category._id,
        name: this.categoryName,
        parentCategories: this.parentCategories
      };
    console.log(updateInfo)
    this.categoryService.updateCategory(updateInfo).subscribe( result => {
        if (result.status === true) {
            this.toastrService.success(result.message);
        } else {
          this.toastrService.error(result.message);
        }
      });
  }

  removeCategory() {
    const qwerty = Number(prompt('Если вы хотите удалить категорию то нажмите 1'));
    if (qwerty === 1) {
      this.categoryService.removeCategory( String(this.category._id)).subscribe( result => {
        if (result.status === true) {
          this.router.navigate(['/category']);
          this.toastrService.success(result.message);
        } else {
          this.toastrService.error(result.message);
        }
      });
    } else {
      this.toastrService.show('Удаление не удалось, попробуйт еще раз!');
    }
  }
}
