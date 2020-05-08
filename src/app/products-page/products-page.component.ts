import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { Brand, Category, Product, Result } from '../shared/interfeices';
import { CategoryService } from '../shared/services/category.service';
import { BrandService } from '../shared/services/brand.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private brandService: BrandService,
    private toastrService: ToastrService
  ) {}

  categories: Category[];
  products: Product[];
  productsRef: Product[] = [];
  loading = false;
  message: Result;
  brands: Brand[];

  ngOnInit() {
    this.loading = true;
    this.categoryService.fetch().subscribe(categories => {
      this.brandService.fetch().subscribe(brands => {
        this.brands = brands;
      });
      this.categories = categories;
      this.productService.fetch().subscribe(products => {
        this.productsRef = products;
        this.products = products;
        this.loading = false;
      });
    });
  }

  addNewProduct(event) {
    this.productService.create(event).subscribe(result => {
      if (result.status === true) {
        this.toastrService.success(result.message);
        this.productService.fetch().subscribe(products => {
          this.products = products;
        });
      } else if (result.status === false) {
        this.toastrService.error(result.message);
      }
    });
  }


  getByCategoryId(event) {
    this.loading = true;
    this.products = this.productsRef;
    if (event === 'Все товары') {
      this.products = this.productsRef;
    } else {
        this.products = this.products.filter(p => p.category === event);
    }
    this.loading = false;
  }
}
