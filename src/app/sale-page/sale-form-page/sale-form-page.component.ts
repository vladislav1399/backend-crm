import {Component, DoCheck, OnInit} from '@angular/core';
import {ClientService} from '../../shared/services/client.service';
import {Category, Client, LeftoversForWarehouse, Sale} from '../../shared/interfeices';
import {CategoryService} from '../../shared/services/category.service';
import {BalanceService} from '../../shared/services/balance.service';
import { ToastrService} from 'ngx-toastr';
import {SaleHomeService} from '../sale.home.service';
import {AuthService} from '../../shared/services/auth.service';
import {SaleService} from '../../shared/services/sale.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sale-form-page',
  templateUrl: './sale-form-page.component.html',
  styleUrls: ['./sale-form-page.component.css'],
  providers: [SaleHomeService]
})
export class SaleFormPageComponent implements OnInit, DoCheck {

  constructor(private clientService: ClientService,
              private categoryService: CategoryService,
              private balanceService: BalanceService,
              private toastrService: ToastrService,
              private saleHomeService: SaleHomeService,
              private authService: AuthService,
              private saleService: SaleService,
              private router: Router) { }

  clients: Client[] = [];
  loading = false;
  categories: Category[] = [];
  balancesForWarehouse: LeftoversForWarehouse[] = [];
  warehouseId = localStorage.getItem('warehouseNow');
  productsSale: any = [];
  totalPrice = 0;
  clientSelectValue: any = '';
  client: Client;
  allDiscountAmount = 0;
  allRegularAmount = 0;
  cancellation = 'Наличными';
  userId = this.authService.getUserId();

  ngOnInit() {
    this.loading = true;
    this.balanceService.fetchBalanceForWarehouse(this.warehouseId).subscribe( balancesForWarehouse => {
      this.balancesForWarehouse = balancesForWarehouse;
      this.categoryService.fetch().subscribe(categories => {
        this.categories = categories;
        this.clientService.fetch().subscribe( clients => {
          this.clients = clients;
          this.loading = false;
        });
      });
    });
  }

  ngDoCheck(): void {
    this.totalPrice = this.saleHomeService.recalculationProductSale(this.productsSale);
    this.allDiscountAmount = 0;
    this.allDiscountAmount = this.saleHomeService.getDiscountAmount(this.productsSale);
    this.allRegularAmount = this.saleHomeService.getPrimaryAmountSale(this.productsSale);

  }

  changeClient(event) {
   this.clientSelectValue = event;
   this.client = this.saleHomeService.getClientForSale(this.clientSelectValue, this.clients);
   this.productsSale = this.saleHomeService.applyDiscountClient(this.client.discount, this.productsSale);
   this.toastrService.show(`Покупатель - ${ this.client.surname} ${ this.client.name} успешно выбран`);
  }


addProductToCart(product) {
  this.productsSale = this.saleHomeService.addToCart(product);
  this.saleHomeService.saveLocalStorageProductsSale(this.productsSale);
}

deleteProduct(product) {
   this.productsSale = this.saleHomeService.deleteProduct(product);
   this.totalPrice -= product.amount;
   this.toastrService.error(`${product.name} в количестве ${product.count} удален`);
   this.saleHomeService.saveLocalStorageProductsSale(this.productsSale);
}

  rePrice(newPrice: number) {
    this.totalPrice = newPrice;
  }

  changeCancellation(event: string) {
        this.cancellation = event;
  }




  createSale() {
    const newSale: Sale = {
      allAmount: this.totalPrice,
      cancellation: this.cancellation,
      client: this.client._id,
      date: new Date(),
      productsSale: this.productsSale,
      status: 'Продано',
      track: '20450511224к2',
      user: this.userId,
      warehouse: this.warehouseId

    };
    this.saleService.createSale(newSale).subscribe( result => {
      if (result.status === true) {
        this.toastrService.success(result.message);
        this.router.navigate(['/sale']);
      } else {
        this.toastrService.error(result.message);
      }
    });
  }



  returnLastSale() {
    const qwerty = Number(prompt('Если хотите востановить последнюю продажу нажмите 1'));
    if (qwerty === 1) {
      this.productsSale = JSON.parse(this.saleHomeService.getProductsFromStorage());
      this.toastrService.success('Последняя продажа успешно востановлена');
    } else {
      this.toastrService.show('Вы отменили постановление продажи');
    }

  }
}
