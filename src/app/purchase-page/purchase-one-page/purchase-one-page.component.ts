import { Component, OnInit } from '@angular/core';
import {PurchaseService} from '../../shared/services/purchase.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Product, Purchase, PurchaseProduct, Supplier} from '../../shared/interfeices';
import {FormControl, FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {SupplierService} from '../../shared/services/supplier.service';
import {PurchaseHomeService} from '../purchases.service';

@Component({
  selector: 'app-purchase-one-page',
  templateUrl: './purchase-one-page.component.html',
  styleUrls: ['./purchase-one-page.component.css'],
  providers: [PurchaseHomeService]
})
export class PurchaseOnePageComponent implements OnInit {

  constructor(private purchaseService: PurchaseService,
              private route: ActivatedRoute,
              private toastrService: ToastrService,
              private supplierService: SupplierService,
              private router: Router,
              private purchaseHomeService: PurchaseHomeService) { }

    purchase: Purchase;
    loading = false;
    cancellationForm: FormGroup;
    supplierForm: FormGroup;
    statusForm: FormGroup;
    trackForm: FormGroup;
    suppliers: Supplier[] = [];
    idWarehouse = localStorage.getItem('warehouseNow');

  ngOnInit() {
      this.loading = true;
      this.route.params.subscribe( params => {
          this.purchaseService.getPurchaseById(params.id).subscribe( purchase => {
            this.supplierService.fetchSupplier().subscribe( suppliers => {
              this.suppliers = suppliers;
              this.purchase = purchase;
              this.cancellationForm = new FormGroup({
              cancellation: new FormControl(this.purchase.cancellation)
            });
              this.supplierForm = new FormGroup({
              supplier: new FormControl(this.purchase.supplier._id)
            });
              this.statusForm = new FormGroup({
              status: new FormControl(this.purchase.status)
            });
              this.trackForm = new FormGroup({
              track: new FormControl(this.purchase.track)
            });
              this.loading = false;
          });
    });
      });
  }

  removePurchase() {
    const qwerty = Number(prompt('Вы уверены что хотите удалить закупку? Для подтверждения напишите 1'));
    if (qwerty === 1) {
      this.purchaseService.deletePurchase(this.purchase._id).subscribe( result => {
        if ( result.status === true ) {
          this.toastrService.show(result.message);
          this.router.navigate(['/purchase']);
        } else {
          this.toastrService.show(result.message);
        }
      });
    }
  }

  reTotalPrice(event) {
   this.purchase.allAmount = event;
  }



  updatePurchase() {
    this.loading = true;
    this.purchase.allAmount =  this.purchaseHomeService.recalculationProduct(this.purchase.productPurchase);
    const updatedPurchase = {
      allAmount: this.purchase.allAmount,
      cancellation: this.cancellationForm.value.cancellation,
      productPurchase: this.purchase.productPurchase,
      status: this.statusForm.value.status,
      track: this.trackForm.value.track,
      updatedDate: new Date(),
      supplier: this.supplierForm.value.supplier,
      warehouseId: this.idWarehouse,
    };
    this.purchaseService.updatePurchase(this.purchase._id, updatedPurchase).subscribe( result => {
      if ( result.status === true ) {
        this.toastrService.success(result.message);
      } else {
        this.toastrService.error(result.message);
      }
      this.loading = false;
    });
  }

  removeProduct(event) {
    const candidate = this.purchase.productPurchase.find(p => p.productId === event.productId);
    if (candidate) {
      this.purchase.allAmount -= event.amount;
      this.toastrService.warning(`${event.name} удален из закупки в количестве -  ${event.count}`);
      this.purchase.allAmount = this.purchaseHomeService.recalculationProduct(this.purchase.productPurchase);
    }
  }

  addProduct(product: Product) {
    const candidate = this.purchase.productPurchase.find( p => p.productId === product._id);
    if (candidate) {
      candidate.count += 1;
      candidate.amount += product.purchasePrice;
      this.toastrService.success(`${product.name} добавлен в закувку в количестве - 1`);
      this.purchaseHomeService.recalculationProduct(this.purchase.productPurchase);
    } else {
      const newProduct: PurchaseProduct = {
        productId: product._id,
        name: product.name,
        pricePurchase: product.purchasePrice,
        count: 1,
        amount: product.purchasePrice
      };
      this.purchase.productPurchase.push(newProduct);
      this.purchase.allAmount  = this.purchaseHomeService.recalculationProduct(this.purchase.productPurchase);
      this.toastrService.success(`${newProduct.name} добавлен в закупку в количестве ${newProduct.amount}`);

    }

  }

}
