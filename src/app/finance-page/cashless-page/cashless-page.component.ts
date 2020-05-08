import { Component, OnInit } from '@angular/core';
import {CashlessService} from '../../shared/services/cashless.service';
import {Cashless} from '../../shared/interfeices';
import {StaticDateFinanceService} from '../date.finance.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-cashless-page',
  templateUrl: './cashless-page.component.html',
  styleUrls: ['./cashless-page.component.css'],
  providers: [StaticDateFinanceService]
})
export class CashlessPageComponent implements OnInit {

  constructor(private cashlessService: CashlessService,
              private staticDateFinanceService: StaticDateFinanceService,
              private toastrService: ToastrService,
              ) { }

  idWarehouse: string;
  cashlesess: Cashless[];
  loading = false;
  dateOt: any;
  dateDo: any;
  p: number;

  ngOnInit() {
    this.loading = true;
    this.idWarehouse = localStorage.getItem('warehouseNow');
    this.cashlessService.fetchCashlessByWarehouse(this.idWarehouse).subscribe(
      cashlesess => {
        this.cashlesess = cashlesess;
        this.loading = false;
      }
    );
  }

  changeDate() {
    const date = this.staticDateFinanceService.getDayForDate(this.dateOt, this.dateDo);
    if (date === false) {
      this.toastrService.warning('Что то пошло не так. Выберите правильно дату!');
    } else {
      this.loading = true;
      this.cashlessService.fetchCashlessByDate(this.idWarehouse, date.dateOt, date.dateDo).subscribe( cashlesess => {
        console.log('this.idWarehouse', this.idWarehouse);
        this.cashlesess = cashlesess;
        console.log(cashlesess);
        this.loading = false;
        this.idWarehouse = localStorage.getItem('warehouseNow');
        console.log('this.idWarehouse', this.idWarehouse);
      });
    }
  }

  changeFilter(event) {
    this.loading = true;
    let status: string = event.target.value;
    console.log(status);
    const date = this.staticDateFinanceService.getDateForStatus(status);
    console.log(date);
    this.cashlessService.fetchCashlessByDate(this.idWarehouse, date.dateOt, date.dateDo).subscribe( cashlesess => {
      console.log('this.idWarehouse', this.idWarehouse);
      console.log(cashlesess);
      this.cashlesess = cashlesess;
      status = '';
      this.loading = false;
      this.idWarehouse = localStorage.getItem('warehouseNow');
    });
  }
}
