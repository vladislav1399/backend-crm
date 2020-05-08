import { Component, OnInit } from '@angular/core';
import {ExpenseService} from '../shared/services/expense.service';
import {IncomeService} from '../shared/services/income.service';
import {ToastrService} from 'ngx-toastr';
import {StaticDateFinanceService} from './date.finance.service';

@Component({
  selector: 'app-finance-page',
  templateUrl: './finance-page.component.html',
  styleUrls: ['./finance-page.component.css'],
  providers: [StaticDateFinanceService]
})
export class FinancePageComponent implements OnInit {

  constructor(private expenseService: ExpenseService,
              private incomeService: IncomeService,
              private toastrService: ToastrService,
              private dateFinanceService: StaticDateFinanceService
              ) { }

  loading = false;
  warehouseId = String(localStorage.getItem('warehouseNow'));
  expensesTotal = 0;
  incomeTotal = 0;
  cashIncome = 0;
  cashlessIncome = 0;
  dateOt: any;
  dateDo: any;

  ngOnInit() {
    this.loading = true;
    this.expenseService.fetch(this.warehouseId).subscribe( expenses => {
      for (const expense of expenses) {
        this.expensesTotal += Number(expense.value);
      }
      this.incomeService.fetch(this.warehouseId).subscribe(incomes => {
        for ( const income of incomes) {
            this.incomeTotal += income.value;
            if (income.cancellation === 'Наличными') {
              this.cashIncome += income.value;
          } else {
              this.cashlessIncome += income.value;
            }
        }
      });
      this.loading = false;
    });
  }


  changeDate() {
    this.loading = true;
    const date = this.dateFinanceService.getDayForDate(this.dateOt, this.dateDo);
    if (date === false) {
        this.toastrService.warning('Что то пошло не так. Выберите правильно дату!');
        this.loading = false;
      } else {
           this.incomeTotal = 0;
           this.expensesTotal = 0;
           this.incomeService.getIncomeForDate(this.warehouseId, this.dateOt, this.dateDo).subscribe(
        incomes => {
            for (const income of incomes) {
              this.incomeTotal += income.value;
              if (income.cancellation === 'Наличными') {
                this.cashIncome += income.value;
              } else {
                this.cashlessIncome += income.value;
              }
            }
            this.expenseService.getExpensesForDate(this.warehouseId, this.dateOt, this.dateDo).subscribe( expenses => {
              for (const expense of expenses) {
                this.expensesTotal += expense.value;
              }
              this.loading = false;
          });
        }
      );
   }
  }

  changeFilter(event) {
    this.loading = true;
    const date = this.dateFinanceService.getDateForStatus(event.target.value);
    this.incomeService.getIncomeForDate(this.warehouseId, date.dateOt, date.dateDo).subscribe( incomes => {
    this.incomeTotal = 0;
    for (const income of incomes) {
    this.incomeTotal += income.value;
    if (income.cancellation === 'Наличными') {
        this.cashIncome += income.value;
      } else {
        this.cashlessIncome += income.value;
      }
  }
    this.expenseService.getExpensesForDate(this.warehouseId, date.dateOt, date.dateDo).subscribe( expenses => {
    this.expensesTotal = 0;
    for (const expense of expenses) {
      this.expensesTotal += expense.value;
    }
    this.loading = false;
  });
});
  }


}



