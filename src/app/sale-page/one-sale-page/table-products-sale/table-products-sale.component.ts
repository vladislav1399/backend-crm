import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product, SaleProduct} from '../../../shared/interfeices';
import {SaleHomeService} from '../../sale.home.service';
import {ToastrService} from 'ngx-toastr';
import {SaleService} from '../../../shared/services/sale.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-table-products-sale',
  templateUrl: './table-products-sale.component.html',
  styleUrls: ['./table-products-sale.component.css'],
})
export class TableProductsSaleComponent implements OnInit  {

  @Input() productsSale: SaleProduct[] = [];
  @Input() loading: boolean;
  @Input() allAmountWithoutDiscount = 0;
  @Input() allDiscountAmount = 0;
  @Input() allAmount = 0;
  @Input() saleHomeService: SaleHomeService;
  @Input() toastrService: ToastrService;
  @Input() saleService: SaleService;
  @Input() saleId: string;
  @Input() discount = 0;
  @Output() productsSaleOutput: EventEmitter<SaleProduct[]> = new EventEmitter<SaleProduct[]>();
  @Output() productChange: EventEmitter<SaleProduct> = new EventEmitter<SaleProduct>();
  @Input() addProductArr: SaleProduct[];
  @Input() deleteProductSale: SaleProduct[];

  @Output() deleteProduct: EventEmitter<SaleProduct[]> = new EventEmitter<SaleProduct[]>();
  @Output() addProductSale: EventEmitter<SaleProduct[]> = new EventEmitter<SaleProduct[]>();


  constructor(private router: Router) { }

  ngOnInit() {
  }

  reAmountFull() {
    this.allAmount = this.saleHomeService.recalculationProductSale(this.productsSale);
    this.allDiscountAmount = this.saleHomeService.getDiscountAmount(this.productsSale);
    this.allAmountWithoutDiscount = this.allAmount;
    this.allAmountWithoutDiscount += this.allDiscountAmount;
  }

  changeCountProductSale(product: SaleProduct, event) {
    this.productsSale = this.saleHomeService.changeCountSale(product, event.target.value, this.productsSale);
    this.reAmountFull();
  }

  changeSalePrice(product: SaleProduct, event) {
    this.productsSale = this.saleHomeService.changeSalePrice(product, event, this.productsSale);
    this.reAmountFull();
  }

  changeDiscount(product: SaleProduct, event) {
    this.discount = Number(event.target.value);
    product.discount = 0;
    product.discount += this.discount;
    this.productChange.emit(product);
    this.reAmountFull();
  }

  removeProduct(product: SaleProduct) {
    const candidate = this.productsSale.find( prod => prod.productId === product.productId);
    if (candidate) {
      this.productsSale.splice(this.productsSale.indexOf(product), 1);
      const candidateAddArr = this.addProductArr.find( p => p.productId === product.productId);
      if (candidateAddArr) {
        this.addProductArr.splice(this.addProductArr.indexOf(candidateAddArr), 1);
        this.toastrService.success(`${product.name} в количестве ${product.count} на сумму ${product.amount} - был удален`);
      }
    }
    this.deleteProductSale.push(product);
    this.reAmountFull();
    this.deleteProduct.emit(this.deleteProductSale);
  }


  saveSale() {
      this.productsSaleOutput.emit(this.productsSale);
  }

  removeSale() {
    const qwerty = Number(prompt('Для удаления продажи введите цифру 1'));
    if (qwerty === 1) {
      this.saleService.removeSale(this.saleId).subscribe( result => {
        if (result.status === true) {
          this.router.navigate(['/sale']);
          this.toastrService.warning(result.message);
        } else {
          this.toastrService.error(result.message);
        }
      });
    } else {
      this.toastrService.error(`Что то пошло не так. Продажа не удалена`);
    }
  }

  addProduct(product: Product) {
    const candidate = this.productsSale.find( p => p.productId === product._id);
    if (candidate) {
      candidate.count += 1;
      candidate.amount += product.salePrice;
      this.saleHomeService.recalculationProductSale(this.productsSale);
    } else {
      const saleProduct: SaleProduct = {
        discount: 0,
        discountAmount: 0,
        priceSale: product.salePrice,
        productId: product._id,
        name: product.name,
        pricePurchase: product.purchasePrice,
        count: 1,
        amount: product.salePrice
      };
      const candidateAddArr = this.productsSale.find( p => p.productId === saleProduct.productId);
      if (candidateAddArr) {
        this.deleteProductSale.splice(this.deleteProductSale.indexOf(saleProduct), 1);
        this.deleteProduct.emit(this.deleteProductSale);
      }
      this.productsSale.push(saleProduct);
      this.addProductArr.push(saleProduct);
      this.addProductSale.emit(this.addProductArr);

    }
    this.reAmountFull();
  }

}
