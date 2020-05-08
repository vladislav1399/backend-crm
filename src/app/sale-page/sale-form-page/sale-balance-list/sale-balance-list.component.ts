import {AfterContentChecked, AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category, Client} from '../../../shared/interfeices';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-sale-balance-list',
  templateUrl: './sale-balance-list.component.html',
  styleUrls: ['./sale-balance-list.component.css']
})
export class SaleBalanceListComponent implements OnInit, AfterViewInit {
  @Input() balancesForWarehouse: any;
  @Input() categories: Category[] = [];
  @Input() client: Client;
  @Output() productCart: EventEmitter<any> = new EventEmitter<any>();

  constructor( private toastrService: ToastrService) { }

  balancedRef = [];
  categoryId = 'all';
  searchCategory = '';

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.balancedRef = this.balancesForWarehouse;
  }

  addProductCart(product: any) {
    const productSale: any = {
      productId: product.productId._id,
      name: product.productId.name,
      count: 1,
      pricePurchase: product.productId.purchasePrice,
      priceSale: product.productId.salePrice,
      amount: product.productId.salePrice,
      discount: 0,
      discountAmount: 0
    };
    if (productSale.count !== 0) {
      this.productCart.emit(productSale);
    } else {
        this.toastrService.show('Этого товара нет на складе');
    }
  }


  filterCategory(event) {
    this.balancesForWarehouse = this.balancedRef;
    const categoryId = this.categories.find(c => c.name === event.target.value)._id;
    if (categoryId) {
      this.categoryId = categoryId
    }
    console.log(categoryId)
    if (this.categoryId === 'all') {
        this.balancesForWarehouse = this.balancedRef;
    } else {
      this.balancesForWarehouse = this.balancesForWarehouse.filter(b => b.productId.category === categoryId);
    }

  }


}
