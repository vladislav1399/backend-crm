import { Component, OnInit } from '@angular/core';
import {StateService} from '../../shared/services/state.service';
import {ExpenseService} from '../../shared/services/expense.service';
import {ToastrService} from 'ngx-toastr';
import {StaticDateFinanceService} from '../date.finance.service';
import {Expense, State} from '../../shared/interfeices';

@Component({
  selector: 'app-expenses-page',
  templateUrl: './expenses-page.component.html',
  styleUrls: ['./expenses-page.component.css'],
  providers: [StaticDateFinanceService]
})
export class ExpensesPageComponent implements OnInit {

  constructor(
              private stateService: StateService,
              private expenseService: ExpenseService,
              private toastrService: ToastrService,
              private staticDateFinanceService: StaticDateFinanceService
  ) { }

  stateExpense: State[];
  expenses: Expense[];
  loading = false;
  idWarehouse: string;
  dateOt: any;
  dateDo: any;
  expensesRar: Expense[] = [];

  ngOnInit() {
    this.idWarehouse = localStorage.getItem('warehouseNow');
    this.loading = true;
    this.expenseService.fetch(this.idWarehouse).subscribe(
      expenses => {
        this.expenses = expenses;
        this.expensesRar = expenses;
        this.stateService.fetchExpensesState().subscribe(
          states => {
            this.stateExpense = states;
          });
        this.loading = false;
      });
  }

  addExpense(event) {
    this.expenseService.create(event).subscribe(
      result => {
        this.toastrService.show(result.message);
        this.expenses.push(event);
      });
  }

  removeExpense(expense: Expense) {
      const quest = Number(prompt('Удалить Расход? Если да напишите 1'));
      if (Number(quest === 1)) {
        this.expenseService.removeExpense(expense._id).subscribe(result => {
            if (result.status === true) {
              this.toastrService.show(result.message);
              this.expenses.splice(this.expenses.indexOf(expense), 1);

            } else {
              this.toastrService.show('Что то пошло не так, попробуйте заного');
            }
        });
      } else {
        this.toastrService.warning('Что то пошло не так, попробуйте заного');
      }
  }

  changeDate() {
    const date = this.staticDateFinanceService.getDayForDate(this.dateOt, this.dateDo);
    if (date === false) {
      this.toastrService.warning('Что то пошло не так. Выберите правильно дату!');
    } else {
      this.loading = true;
      this.expenseService.getExpensesForDate(this.idWarehouse, date.dateOt, date.dateDo).subscribe( expenses => {
        this.expenses = expenses;
        this.loading = false;
        this.idWarehouse = localStorage.getItem('warehouseNow');
      });
    }
  }

  changeFilter(event) {
    this.loading = true;
    let status: string = event.target.value;
    const date = this.staticDateFinanceService.getDateForStatus(status);
    this.expenseService.getExpensesForDate(this.idWarehouse, date.dateOt, date.dateDo).subscribe( expenses => {
      this.expenses = expenses;
      status = '';
      this.loading = false;
      this.idWarehouse = localStorage.getItem('warehouseNow');
    });
  }

  changeCancellation(event) {
    this.loading = true;
    this.expenses = this.expensesRar.filter(expense => expense.cancellation === event.target.value);
    this.loading = false;

  }

  changeState(event) {
    this.loading = true;
    const stateId: string = event.target.value;
    this.expenseService.fetch(this.idWarehouse).subscribe(
      expenses => {
        this.expenses = expenses;
        this.expensesRar = expenses;
        this.expenses = this.expensesRar.filter(expense => expense.stateExpense._id === stateId);
        this.loading = false;
      });
  }

}
