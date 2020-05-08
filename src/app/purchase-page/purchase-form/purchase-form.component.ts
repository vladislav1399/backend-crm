import { Component, OnInit } from '@angular/core';
import {SupplierService} from '../../shared/services/supplier.service';
import {Balance, Category, Product, PurchaseProduct, Sale, Supplier} from '../../shared/interfeices';
import {CategoryService} from '../../shared/services/category.service';
import {ProductService} from '../../shared/services/product.service';
import {BalanceService} from '../../shared/services/balance.service';
import {SaleService} from '../../shared/services/sale.service';
import {PurchaseService} from '../../shared/services/purchase.service';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-purchase-form',
  templateUrl: './purchase-form.component.html',
  styleUrls: ['./purchase-form.component.css']
})
export class PurchaseFormComponent implements OnInit {

constructor(private supplierService: SupplierService,
            private categoryService: CategoryService,
            private productService: ProductService,
            private balanceService: BalanceService,
            private saleService: SaleService,
            private authService: AuthService,
            private purchaseService: PurchaseService,
            private toastrService: ToastrService,
            private router: Router) { }

  suppliers: Supplier[] = [];
  loading = false;
  categories: Category[] = [];
  products: Product[] = [];
  balances: Balance[] = [];
  sales: Sale[] = [];
  productsPurchase: PurchaseProduct[] = [];
  balancesRef: Balance[] = [];
  totalPrice = 0;
  statusPurchase: string;
  cancellationPurchase: string;
  supplierPurchase;
  user: string = this.authService.getUserId();


  ngOnInit() {
    this.loading = true;
    this.balanceService.getFullBalance().subscribe(balances => {
      this.balances = balances;
      this.balancesRef = balances;
      this.saleService.getAllSale().subscribe( sales => {
        this.sales = sales;
        this.supplierService.fetchSupplier().subscribe( suppliers => {
          this.suppliers = suppliers;
          this.categoryService.fetch().subscribe( categories => {
          this.categories = categories;
          this.loading = false;
        });
        });
      });
    });
}


selectCategory(event) {
    this.balances = this.balancesRef;
    if (event === 'allCategories') {
      this.balances = this.balancesRef;
    } else {
      this.balances = this.balances.filter(prod => prod.products.category === event );
    }
}

  selectStatus(event: string) {
    this.statusPurchase = event;
  }

  selectSupplier(event: string) {
    this.supplierPurchase = event;
  }

  selectCancellation(event: string) {
    this.cancellationPurchase = event;
  }

  addProductOfPurchase(purchaseProduct: PurchaseProduct) {
    purchaseProduct.amount.toFixed(2);
    const candidate = this.productsPurchase.find(
      prod => prod.productId === purchaseProduct.productId
    );
    if (candidate) {
      candidate.count += 1;
      candidate.amount += purchaseProduct.pricePurchase;
      candidate.amount.toFixed(2);
    } else {
      this.productsPurchase.push(purchaseProduct);
    }
    this.totalPrice += purchaseProduct.pricePurchase;
    localStorage.setItem(
      'purchaseLocal',
      JSON.stringify(this.productsPurchase)
    );

  }

  removeProduct(event) {
    this.totalPrice -= event.amount;
  }

  createPurchase() {
    this.loading = true;
    const purchase = {
      allAmount: this.totalPrice,
      cancellation: this.cancellationPurchase,
      supplier: this.supplierPurchase,
      date: new Date(),
      updatedDate: new Date(),
      delivered: false,
      productPurchase: this.productsPurchase,
      user: this.user,
      warehouseId: localStorage.getItem('warehouseNow'),
      status: this.statusPurchase
    };
    this.purchaseService.createPurchase(purchase).subscribe(result => {
      if (result.status === true) {
        this.toastrService.success(result.message);
        this.productsPurchase = [];
        this.totalPrice = 0;
        this.loading = false;
        this.router.navigate(['/purchase']);
      } else {
        this.toastrService.error(result.message);
        this.loading = false;
      }
    });
  }

  getLastPurchase() {
    const qwerty = Number(prompt('Вы действительно хотите востановить последнюю закупку?'));
    if (qwerty === 1) {
      this.productsPurchase = JSON.parse(localStorage.getItem('purchaseLocal'));
      for (const product of this.productsPurchase) {
        this.totalPrice += product.amount;
      }
    }
  }

  getTotalPrice(event: number) {
      this.totalPrice = event;
  }
}
