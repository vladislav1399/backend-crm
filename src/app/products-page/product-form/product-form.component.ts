import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Brand, Category, Product} from '../../shared/interfeices';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BarcodeService} from '../../shared/services/barcode.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  @Input() categories: Category[];
  @Input() brands: Brand[];
  @Output() addNewProduct: EventEmitter<Product> = new EventEmitter<Product>();
  constructor(private barcodeService: BarcodeService) { }

  productForm: FormGroup;
  categoryId: string;
  categoryName: string;
  value = '';
  searchCategory = '';

  ngOnInit() {
    this.barcodeService.getLastBarCode().subscribe(lastBarcode => {this.value = String(lastBarcode);
    });
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      category: new FormControl('', [Validators.required, Validators.minLength(3)]),
      barCode: new FormControl(this.value),
      purchasePrice:  new FormControl(1, [Validators.required]),
      salePrice: new FormControl(1, [Validators.required]),
      brand: new FormControl('', [Validators.required]),
    });
  }

  changeCategory(event) {
    this.categoryId = event.target.id;
    this.categoryName = event.target.innerText;
  }

  addProduct() {
    const newProduct: Product = {
      name: this.productForm.value.name,
      category: this.categoryId,
      barCode: Number(this.value),
      salePrice: this.productForm.value.salePrice,
      purchasePrice: this.productForm.value.purchasePrice,
      brand: this.productForm.value.brand,
    };
    this.addNewProduct.emit(newProduct);

    this.barcodeService.getLastBarCode().subscribe(lastBarcode => {this.value = String(lastBarcode);
    });
  }

  getProductByCategory(event: any) {
  console.log(event)
  }
}
