import { Component, OnInit } from '@angular/core';
import {WarehouseService} from '../shared/services/warehouse.service';
import {Category, Warehouse} from '../shared/interfeices';
import {BalanceService} from '../shared/services/balance.service';
import {CategoryService} from '../shared/services/category.service';

@Component({
  selector: 'app-product-balance',
  templateUrl: './product-balance.component.html',
  styleUrls: ['./product-balance.component.css']
})
export class ProductBalanceComponent implements OnInit {

  constructor(private warehouseService: WarehouseService,
              private balanceService: BalanceService,
              private categoryService: CategoryService) { }

  warehouses: Warehouse[] = [];
  loading = false;
  balances: any;
  warehousesRef: Warehouse[] = [];
  balancesRef: any;
  allAndOne;
  warehouseChange = 'Cклад не выбран';
  categories: Category[] = [];
  searchProductOfBalance = '';
  categoryNow = 'all';
  myEvent: any = {
    target: {
      value: 'all'
    }
  };

  ngOnInit() {

    this.changeCategory(this.myEvent);
    this.loading = true;
    this.warehouseService.fetch().subscribe( warehouses => {
          this.warehouses = warehouses;
          this.warehousesRef = warehouses;
          this.categoryService.fetch().subscribe( categories => {
              this.categories = categories;
              this.changeWarehouse(this.myEvent);
              this.loading = false;
          });
    });
  }

  changeWarehouse(event) {
    this.loading = true;
    if (event.target.value === 'all') {
        this.warehouseChange = 'Все склады';
        this.warehouses = this.warehousesRef;
        this.balanceService.getFullBalance().subscribe( balances => {
          this.balancesRef = balances;
          this.balances = balances;
          this.changeCategory(this.categoryNow);
          this.allAndOne = true;
      });
      } else {
        this.balanceService.fetchBalanceForWarehouse(event.target.value).subscribe( balances => {
          this.warehouses = this.warehousesRef;
          this.warehouses = this.warehouses.filter(warehouse => warehouse._id === event.target.value);
          this.warehouseChange = this.warehouses[0].name;
          this.balances = balances;
          this.balancesRef = balances;
          this.allAndOne = false;
          this.changeCategory(this.categoryNow);

        });
      }
    this.loading = false;
  }

  changeCategory(event) {
    this.loading = true;
    if (typeof event === 'string') {
      this.categoryNow = event;
    } else {
      this.categoryNow = event.target.value;
    }
    if (this.categoryNow === 'all') {
      this.balances = this.balancesRef;
      this.loading = false;
    } else {
      this.balances = this.balancesRef;
      if (this.warehouseChange === 'Все склады') {
        this.balances = this.balances.filter(balance => balance.products.category === this.categoryNow);
        this.loading = false;
      } else {
        this.balances = this.balances.filter(balance => balance.productId.category === this.categoryNow);
        this.loading = false;
      }
    }
  }

}
