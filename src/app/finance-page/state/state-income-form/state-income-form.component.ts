import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {State} from '../../../shared/interfeices';

@Component({
  selector: 'app-state-income-form',
  templateUrl: './state-income-form.component.html',
  styleUrls: ['./state-income-form.component.css']
})
export class StateIncomeFormComponent implements OnInit {
  @Output() addNewIncome: EventEmitter<State> = new EventEmitter<State>();
  constructor() { }
  formIncome: FormGroup;

  ngOnInit() {
    this.formIncome = new FormGroup({
      nameIncome: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  addIncome() {
      const newIncome = {
        name: this.formIncome.value.nameIncome
      };
      this.addNewIncome.emit(newIncome);
      this.formIncome.reset();
  }

}
