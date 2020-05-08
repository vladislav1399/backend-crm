import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Warehouse} from '../../../shared/interfeices';

@Component({
  selector: 'app-warehouse-form',
  templateUrl: './warehouse-form.component.html',
  styleUrls: ['./warehouse-form.component.css']
})
export class WarehouseFormComponent implements OnInit {
  @Output() addNewWarehouse: EventEmitter<Warehouse> = new EventEmitter<Warehouse>();
  constructor() { }
  warehouseForm: FormGroup;


  ngOnInit() {
      this.warehouseForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)])
      });
  }

  addWarehouse() {
    const newWarehouse: Warehouse = this.warehouseForm.value;
    this.addNewWarehouse.emit(newWarehouse);
    this.warehouseForm.disable();
    this.warehouseForm.reset();
  }
}
