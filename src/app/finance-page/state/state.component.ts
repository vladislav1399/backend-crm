import { Component, OnInit } from '@angular/core';
import {StateService} from '../../shared/services/state.service';
import {Income, Result, State} from '../../shared/interfeices';
import {ToastrService} from 'ngx-toastr';
import {IncomeService} from '../../shared/services/income.service';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {

  constructor(private stateService: StateService,
              private toastrService: ToastrService) { }
  incomesState: State[];
  expensesState: State[];
  loading = false;
  message: Result;

  ngOnInit() {
    this.loading = true;
    this.stateService.fetchExpensesState().subscribe(
      expensesSt => {
        this.expensesState = expensesSt;
        this.stateService.fetchIncomeState().subscribe(
          incomesSt => {
            this.incomesState = incomesSt;
            this.loading = false;
          });
      });
  }

  addNewExpenses(event) {
    this.stateService.createStateExpenses(event).subscribe(
      (result: Result) => {
        this.toastrService.success(result.message);
        this.stateService.fetchExpensesState().subscribe( expensesSt => this.expensesState = expensesSt);
      });
}

  addNewIncome(event) {
    this.stateService.createStateIncome(event).subscribe(
      result => {
        this.toastrService.success(result.message);
        this.stateService.fetchIncomeState().subscribe( incomesSt => this.incomesState = incomesSt);
      }
    );
}

  removeState(event, state: State) {
    const query = Number(prompt('Вы действительно хотите удалить статью. Введите 1'));
    if (query === 1) {
      if (String(event.target.id) === String('income')) {
        this.stateService.removeIncomeState(String(state._id)).subscribe( result => {
          if (result.status === true) {
            this.incomesState.splice(this.incomesState.indexOf(state), 1);
            this.toastrService.success(`Статья  прихода ${state.name} успешно удалена!` );
          }
        });

      } else if (String(event.target.id) === String('expense')) {
        this.stateService.removeExpenseState(String(state._id)).subscribe( result => {
          if (result.status === true) {
            this.expensesState.splice(this.expensesState.indexOf(state), 1);
            this.toastrService.success(`Статья расхода ${state.name} успешно удалена!` );
          }
        });
      }
    } else {
        this.toastrService.warning('Что пошло не так попробуйте снова');
    }
}

}
