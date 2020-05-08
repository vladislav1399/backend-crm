import { Component, OnInit } from '@angular/core';
import {CashService} from '../../shared/services/cash.service';
import {Cash} from '../../shared/interfeices';
import {StaticDateFinanceService} from '../date.finance.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-cash-page',
  templateUrl: './cash-page.component.html',
  styleUrls: ['./cash-page.component.css'],
  providers: [StaticDateFinanceService]
})
export class CashPageComponent implements OnInit {

  constructor(private cashService: CashService,
              private dateFinanceService: StaticDateFinanceService,
              private toastrService: ToastrService) { }

  cashes: Cash[];
  idWarehouse = localStorage.getItem('warehouseNow');
  loading = false;
  dateOt: any;
  dateDo: any;
  p: number;

  ngOnInit() {
    this.loading = true;
    this.cashService.fetchCashByWarehouse(this.idWarehouse).subscribe(
      cashes => {
        this.cashes = cashes;
        this.idWarehouse = localStorage.getItem('warehouseNow');
        console.log('this.idWarehouse', this.idWarehouse)
        this.loading = false;
      }
    );
  }

  changeDate() {

    const date = this.dateFinanceService.getDayForDate(this.dateOt, this.dateDo);
    if (date === false) {
      this.toastrService.warning('Что то пошло не так. Выберите правильно дату!');
    } else {
      this.loading = true;
      this.cashService.fetchCashByDate(this.idWarehouse, date.dateOt, date.dateDo).subscribe( cashes => {
        console.log('this.idWarehouse', this.idWarehouse);
        this.cashes = cashes;
        console.log(cashes);
        this.loading = false;
        this.idWarehouse = localStorage.getItem('warehouseNow');
        console.log('this.idWarehouse', this.idWarehouse)
      });
    }
  }

  changeFilter(event) {
    this.loading = true;
    let status: string = event.target.value;
    console.log(status);
    const date = this.dateFinanceService.getDateForStatus(status);
    console.log(date);
    this.cashService.fetchCashByDate(this.idWarehouse, date.dateOt, date.dateDo).subscribe( cashes => {
      console.log('this.idWarehouse', this.idWarehouse)
      console.log(cashes);
      this.cashes = cashes;
      status = '';
      this.loading = false;
      this.idWarehouse = localStorage.getItem('warehouseNow');
    });
  }

}
