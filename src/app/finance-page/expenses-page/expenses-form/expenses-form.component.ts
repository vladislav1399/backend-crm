import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Expense, State} from '../../../shared/interfeices';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../shared/services/auth.service';

@Component({
  selector: 'app-expenses-form',
  templateUrl: './expenses-form.component.html',
  styleUrls: ['./expenses-form.component.css']
})

export class ExpensesFormComponent implements OnInit {
  @Input() stateExpense: State[];
  @Output() addExpense: EventEmitter<Expense> = new EventEmitter<Expense>();

  constructor(private authService: AuthService) {}

  formExpense: FormGroup;
  warehouseId: string = localStorage.getItem('warehouseNow');

  ngOnInit() {
    this.formExpense = new FormGroup({
      stateExpense: new FormControl('', [Validators.required, Validators.minLength(3)]),
      cancellation: new FormControl('', [Validators.required, Validators.minLength(3)]),
      value: new FormControl(1, [Validators.required, Validators.min(1)]),
      description: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
  }

  addNewExpense() {
    const userId = this.authService.getUserId();
    const newExpense: Expense = this.formExpense.value;
    newExpense.author = userId;
    newExpense.warehouseId = this.warehouseId;
    newExpense.date = new Date();
    this.addExpense.emit(newExpense);
    this.formExpense.reset();
  }

}
