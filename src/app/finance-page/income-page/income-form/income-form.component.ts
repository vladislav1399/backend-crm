import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Income, State} from '../../../shared/interfeices';
import {AuthService} from '../../../shared/services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.css']
})
export class IncomeFormComponent implements OnInit {
  @Input() stateIncome: State[];
  @Output() addIncome: EventEmitter<Income> = new EventEmitter<Income>();

  constructor(private authService: AuthService) {}

  formIncome: FormGroup;
  warehouseId: string = localStorage.getItem('warehouseNow');

  ngOnInit() {
    this.formIncome = new FormGroup({
      stateIncome: new FormControl('', [Validators.required, Validators.minLength(3)]),
      cancellation: new FormControl('', [Validators.required, Validators.minLength(3)]),
      value: new FormControl(1, [Validators.required, Validators.min(1)]),
      description: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
  }

  addNewIncome() {
    const userId = this.authService.getUserId();
    const newIncome: Income = this.formIncome.value;
    newIncome.author = userId;
    newIncome.warehouseId = this.warehouseId;
    newIncome.date = new Date();
    this.addIncome.emit(newIncome);
    this.formIncome.reset();
  }

}
