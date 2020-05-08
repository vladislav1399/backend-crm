import { Component, OnInit } from '@angular/core';
import {Income, State} from '../../shared/interfeices';
import {StateService} from '../../shared/services/state.service';
import {IncomeService} from '../../shared/services/income.service';
import {ToastrService} from 'ngx-toastr';
import {StaticDateFinanceService} from '../date.finance.service';

@Component({
  selector: 'app-income-page',
  templateUrl: './income-page.component.html',
  styleUrls: ['./income-page.component.css'],
  providers: [StaticDateFinanceService]
})
export class IncomePageComponent implements OnInit {

  constructor(
              private stateService: StateService,
              private incomeService: IncomeService,
              private toastrService: ToastrService,
              private staticDateFinanceService: StaticDateFinanceService,
              ) { }

  stateIncome: State[] = [];
  incomes: Income[] = [];
  loading = false;
  idWarehouse: string;
  dateOt: Date;
  dateDo: Date;
  incomesRar: Income[] = [];

  ngOnInit() {
    this.loading = true;
    this.idWarehouse = localStorage.getItem('warehouseNow');
    this.incomeService.fetch(this.idWarehouse).subscribe(
      incomes => {
        this.incomes = incomes;
        this.incomesRar = incomes;
        this.stateService.fetchIncomeState().subscribe(
          states => {
            this.stateIncome = states;
            this.loading = false;
          });
      });
  }

  addIncome(event) {
    this.incomeService.create(event).subscribe(
      result => {
        this.toastrService.success(result.message);
        this.incomeService.fetch(this.idWarehouse).subscribe(
          incomes => {
            this.incomes = incomes;
          });
      });
  }


  removeIncome(income: Income) {
    const quest = Number(prompt('Удалить Приход? Если да напишите 1'));
    if (Number(quest === 1)) {
      this.incomeService.removeIncome(income._id).subscribe(result => {
        if (result.status === true) {
          this.incomes.splice(this.incomes.indexOf(income), 1);
          this.toastrService.success(result.message);
        } else {
          this.toastrService.show('Что то пошло не так, попробуйте заного');
        }
      });
    } else {
      this.toastrService.warning('Что то пошло не так, попробуйте заного');
    }
  }

  changeFilter(event) {
    this.loading = true;
    let status: string = event.target.value;
    const date = this.staticDateFinanceService.getDateForStatus(status);
    this.incomeService.getIncomeForDate(this.idWarehouse, date.dateOt, date.dateDo).subscribe( incomes => {
      this.incomes = incomes;
      status = '';
      this.loading = false;
      this.idWarehouse = localStorage.getItem('warehouseNow');
    });
  }

  changeCancellation(event) {
    this.incomes = this.incomesRar;
    this.loading = true;
    this.incomes = this.incomes.filter(income => income.cancellation === event.target.value);
    this.loading = false;
  }

  changeState(event) {
    this.loading = true;
    const stateId: string = event.target.value;
    this.incomeService.fetch(this.idWarehouse).subscribe(
      incomes => {
        this.incomes = incomes;
        this.incomesRar = incomes;
        this.incomes = this.incomesRar.filter(income => income.stateIncome._id === stateId);
        this.loading = false;
      });
  }

  changeDate(event) {
    this.loading = true;
    const date = this.staticDateFinanceService.getDayForDate(this.dateOt, this.dateDo);
    if (date === false) {
      this.toastrService.warning('Что то пошло не так. Выберите правильно дату!');
    } else {
      this.incomeService.getIncomeForDate(this.idWarehouse, date.dateOt, date.dateDo).subscribe( incomes => {
        this.incomes = incomes;
        this.loading = false;
        this.idWarehouse = localStorage.getItem('warehouseNow');
      });
    }
  }
}
