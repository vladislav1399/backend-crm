import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Category, Product} from '../../../shared/interfeices';
import {CategoryService} from '../../../shared/services/category.service';
import {ProductService} from '../../../shared/services/product.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.css']
})
export class AddProductFormComponent implements OnInit {
  @Output() addNewProduct: EventEmitter<Product> = new EventEmitter<Product>();
  categoryName = 'Все товары';

  categories: Category[] = [];
  products: Product[] = [];
  productsRef: Product[] = [];
  constructor(private categoryService: CategoryService,
              private productService: ProductService) { }

  ngOnInit() {
      this.categoryService.fetch().subscribe( categories => {
        this.categories = categories;
        this.productService.fetch().subscribe( products => {
          this.products = products;
          this.productsRef = products;
        });
      });
  }

  changeCategory(event) {
    this.products = this.productsRef;
    if (event.target.value === 'all') {
      this.products = this.productsRef;
    } else {
      this.products = this.products.filter(product => product.category === event.target.value);
    }

  }

  addProductPurchaseAndSale(product: Product) {
    this.addNewProduct.emit(product);
  }
}
