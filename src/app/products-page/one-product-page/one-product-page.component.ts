import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../shared/services/product.service';
import {Brand, Category, Product} from '../../shared/interfeices';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../shared/services/category.service';
import {BrandService} from '../../shared/services/brand.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-one-product-page',
  templateUrl: './one-product-page.component.html',
  styleUrls: ['./one-product-page.component.css']
})
export class OneProductPageComponent implements OnInit {

  constructor(private productService: ProductService,
              private router: ActivatedRoute,
              private categoryService: CategoryService,
              private brandService: BrandService,
              private toastrService: ToastrService,
              private route: Router) {
  }

  product: Product;
  loading = false;
  brands: Brand[] = [];
  productForm: FormGroup;
  categories: Category[] = [];
  characterForm: FormGroup;
  newBrandProduct = '';
  newCategoryProducts = '';
  updatedProduct: Product;

  ngOnInit() {
    this.loading = true;
    this.router.params.subscribe(params => {
      this.productService.fetchById(String(params.id)).subscribe(product => {
        this.product = product;
        this.categoryService.fetch().subscribe(categories => {
          this.categories = categories;
        });
        const productId = String(this.product.category);
        this.categoryService.fetchCategoryById(productId).subscribe(category => {
          this.brandService.fetch().subscribe(brands => {
            this.brands = brands;
          });
          if (category) {
            this.product.categoryName = category.name;
          }

          this.productForm = new FormGroup({
              salePrice: new FormControl(this.product.salePrice, Validators.required),
              purchasePrice: new FormControl(this.product.purchasePrice, Validators.required),
            });
          this.characterForm = new FormGroup({
              name: new FormControl(this.product.name, Validators.required),
              category: new FormControl(this.product.category, Validators.required),
              brand: new FormControl(this.product.brand._id, Validators.required),
              barCode: new FormControl(this.product.barCode, Validators.required)
            });
          this.loading = false;
        });

      });
    });
  }

  changeBrand(event) {
    this.newBrandProduct = event.target.value;
  }

  changeCategory(event) {
    this.newCategoryProducts = event.target.value;
  }

  saveUpdatedProduct() {
      this.updatedProduct = {
        brand: this.characterForm.value.brand,
        category: this.characterForm.value.category,
        purchasePrice: this.productForm.value.purchasePrice,
        salePrice: this.productForm.value.salePrice,
        _id: this.product._id,
        name: this.characterForm.value.name,
      };
      this.productService.updateProduct(this.updatedProduct._id, this.updatedProduct).subscribe( result => {
        if (result.status === true) {
            this.toastrService.show(result.message);
        } else {
          this.toastrService.show(result.message);
        }
      });
    }

  removeProduct() {
    const qwerty = Number(prompt('Вы действительно хотите удалить товар? Тогда впишите 1 и ок'));
    if (qwerty === 1) {
      this.productService.removeProduct(this.product._id).subscribe( result => {
        if ( result.status === true) {
          this.route.navigate(['/products']);
          this.toastrService.error(result.message);
        } else {
          this.toastrService.show(result.message);
        }
      });
    } else {
      this.toastrService.warning('Что то пошло не так попробуйте снова!');
    }

  }
}
