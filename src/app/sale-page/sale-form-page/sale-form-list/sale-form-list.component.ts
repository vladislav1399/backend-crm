import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Client, SaleProduct} from '../../../shared/interfeices';
import {ToastrService} from 'ngx-toastr';
import {SaleHomeService} from '../../sale.home.service';

@Component({
  selector: 'app-sale-form-list',
  templateUrl: './sale-form-list.component.html',
  styleUrls: ['./sale-form-list.component.css'],
  providers: [SaleHomeService]
})
export class SaleFormListComponent implements OnInit {

  @Input() clients: Client[] = [];
  @Input() productsSale: any;
  @Input() totalPrice: number;
  @Output() delProduct: EventEmitter<any> = new EventEmitter<any>();
  @Output() allAmountPrice: EventEmitter<number> = new EventEmitter<number>();
  @Output() checkClient: EventEmitter<Client> = new EventEmitter<Client>();
  @Output() cancellationSale: EventEmitter<string> = new EventEmitter<string>();
  @Input() allDiscountAmount: number;
  @Input() allRegularAmount: number;

  constructor(private saleHomeService: SaleHomeService) { }

  searchClientSurname = '';

  ngOnInit() {

  }


  changeCount(product: SaleProduct, event) {
    const newValue: number = event.target.value;
    this.productsSale = this.saleHomeService.changeCountSale(product, newValue, this.productsSale);
    this.allAmountPrice.emit(this.saleHomeService.recalculationProductSale(this.productsSale));
}

  changeSalePrice(product: SaleProduct, event) {
   this.productsSale = this.saleHomeService.changeSalePrice(product, event, this.productsSale);
   this.saleHomeService.saveProductsSale(this.productsSale);
   const totalPriceNew = this.saleHomeService.recalculationProductSale(this.productsSale);
   this.allAmountPrice.emit(totalPriceNew);
  }

  changeDiscount(productSale, event) {
   this.productsSale = this.saleHomeService.changeDiscount(productSale, event.target.value, this.productsSale);

  }

  removeProduct(productCart: any) {
      this.delProduct.emit(productCart);
  }

  changeClient(event) {
    const clientId = event.target.value;
    this.checkClient.emit(clientId);
  }


  changeCancellation(event) {
   this.cancellationSale.emit(event.target.value);
  }
}
