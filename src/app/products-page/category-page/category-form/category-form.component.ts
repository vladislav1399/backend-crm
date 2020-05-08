import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../../../shared/interfeices';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  @Input() categories: Category[];
  @Output() addNewCategory: EventEmitter<Category> = new EventEmitter<Category>();
  constructor() { }

  subCategoryId = ' ';
  subCategoryName = ' ';
  categoryForm: FormGroup;
  newCategory: Category;

  ngOnInit() {
    this.categoryForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    });
  }

  changeParentCategory(category) {
    this.subCategoryId = category._id;
    this.subCategoryName = category.name;
  }

  addCategory() {
    if (this.subCategoryId !== '' && this.subCategoryName !== '') {

      const parentCategories: any = {
        nameParent: String(this.subCategoryName),
        parent: String(this.subCategoryId)
      };
      this.newCategory = {
        name: this.categoryForm.value.name,
        parentCategories
      };

      this.addNewCategory.emit(this.newCategory);
      this.subCategoryId = '';
      this.subCategoryName = '';
      this.categoryForm.reset();

    } else {
      this.newCategory = {
        name: this.categoryForm.value.name,
        parentCategories: [{nameParent: '', parent: ''}]
      };
      this.addNewCategory.emit(this.newCategory);
      this.subCategoryId = '';
      this.subCategoryName = '';
      this.categoryForm.reset();
    }
  }


}
