import {Component, OnInit} from '@angular/core';
import {SaleService} from '../../shared/services/sale.service';
import {Client, Sale, SaleProduct} from '../../shared/interfeices';
import {ActivatedRoute} from '@angular/router';
import {ClientService} from '../../shared/services/client.service';
import {ToastrService} from 'ngx-toastr';
import {SaleHomeService} from '../sale.home.service';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-one-sale-page',
  templateUrl: './one-sale-page.component.html',
  styleUrls: ['./one-sale-page.component.css'],
  providers: [SaleHomeService]
})
export class OneSalePageComponent implements OnInit {

  constructor(public saleService: SaleService,
              private route: ActivatedRoute,
              private clientService: ClientService,
              public toastrService: ToastrService,
              public saleHomeService: SaleHomeService,
              private authService: AuthService) {
  }

  productsSale: SaleProduct[] = [];
  sale: Sale;
  loading = false;
  clients: Client[] = [];
  allDiscountAmount = 0;
  allAmountWithoutDiscount = 0;
  discount = 0;
  newClient: Client;
  totalPrice: number;
  deleteProductSale: SaleProduct[] = [];
  addProductSale: SaleProduct[] = [];
  clientId: any;
  cancellation = '';


  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe(params => {
      this.saleService.getSaleById(String(params.id)).subscribe((sale: any) => {
        this.sale = sale;
        this.cancellation = this.sale.cancellation;
        this.productsSale = this.sale.productsSale;
        this.clientService.fetch().subscribe(clients => {
          this.clients = clients;
          const client = this.clients.find(c => c._id === sale.client._id);
          this.clientId = client._id;
          this.discount = client.discount;
          for (const product of this.productsSale) {
            product.discount = this.discount;
            this.allDiscountAmount += product.discountAmount;
          }
          this.totalPrice = this.sale.allAmount;
          this.allAmountWithoutDiscount = this.totalPrice;
          this.allAmountWithoutDiscount += this.allDiscountAmount;
          this.loading = false;
        });
      });
    });
  }


  checkCancellation(event: string) {
    this.sale.cancellation = event;
    this.cancellation = event;
  }

  checkClient(client: Client) {
    this.discount = 0;
    this.productsSale = this.saleHomeService.removeSaleDiscount(this.productsSale);
    this.newClient = client;
    this.clientId = this.newClient._id;
    this.discount = this.newClient.discount;
    this.productsSale = this.saleHomeService.applyDiscountClient(this.discount, this.productsSale);
    this.sale.productsSale = this.productsSale;
    this.totalPrice = this.saleHomeService.recalculationProductSale(this.productsSale);
    this.sale.allAmount = this.totalPrice;
    this.allDiscountAmount = this.saleHomeService.getDiscountAmount(this.productsSale);
    this.allAmountWithoutDiscount = this.totalPrice;
    this.allAmountWithoutDiscount += this.allDiscountAmount;
    this.toastrService.show(`Покупатель - ${client.surname} ${client.name} успешно выбран`);
  }

  checkStatus(event: string) {
    this.sale.status = event;
  }

  checkTrack(event) {
    this.sale.track = event;
  }

  updateSale(productsSale: SaleProduct[]) {
    if (this.cancellation === '') {
      this.cancellation = 'Наличными';
    }
    this.loading = true;
    const updateSale: Sale = {
      _id: this.sale._id,
      allAmount: this.saleHomeService.recalculationProductSale(productsSale),
      cancellation: this.cancellation,
      client: this.clientId,
      date: this.sale.date,
      updatedDate: new Date(),
      productsSale,
      status: this.sale.status,
      track: this.sale.track,
      // @ts-ignore
      user: this.sale.user._id,
      warehouse: this.sale.warehouse,
      deleteProductSale: this.deleteProductSale,
      addProductSale: this.addProductSale
    };

    this.saleService.updateSale(updateSale).subscribe(result => {
      this.loading = false;
      if (result.status === true) {
        this.toastrService.success(result.message);
      } else {
        this.toastrService.error(result.message);
      }
    });
  }

  changeDiscount(saleProduct: SaleProduct) {
    this.productsSale = this.saleHomeService.changeDiscount(saleProduct, saleProduct.discount, this.productsSale);
  }


  removeProduct(deleteArrSale: SaleProduct[]) {
    this.deleteProductSale = deleteArrSale;
  }

  addProductUpdateArr(addProductUpdateArr: SaleProduct[]) {
    this.addProductSale = addProductUpdateArr;

  }

}
