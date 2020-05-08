import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../shared/interfeices';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Input() products: Product[];

  constructor() { }

  searchProduct = '';
  searchCode = '';

  ngOnInit() {

  }

}
