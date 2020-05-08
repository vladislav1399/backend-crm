import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../../shared/interfeices';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})

export class CategoryListComponent implements OnInit {
  @Input()categories: Category[];
  @Output() getByCategoryId: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }
  searchCategory = '';
  ngOnInit() {}

  getProductByCategory(event) {
    const categoryId: string = event.target.id;
    this.getByCategoryId.emit(categoryId);
  }

}
