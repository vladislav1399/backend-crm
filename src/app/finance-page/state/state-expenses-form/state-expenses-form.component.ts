import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {State} from '../../../shared/interfeices';

@Component({
  selector: 'app-state-expenses-form',
  templateUrl: './state-expenses-form.component.html',
  styleUrls: ['./state-expenses-form.component.css']
})
export class StateExpensesFormComponent implements OnInit {
  @Output() addNewExpenses: EventEmitter<State> =  new EventEmitter<State>();

  constructor() { }

  formExpenses: FormGroup;

  ngOnInit() {
    this.formExpenses = new FormGroup({
      nameExpenses: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  addExpenses() {
    const newExpensesState: State = {
      name: this.formExpenses.value.nameExpenses
    };

    this.addNewExpenses.emit(newExpensesState);
    this.formExpenses.reset();
  }

}
