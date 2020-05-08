import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Supplier} from '../../../shared/interfeices';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.css']
})
export class SupplierFormComponent implements OnInit {
  @Output() addNewSupplier: EventEmitter<Supplier> = new EventEmitter<Supplier>();

  formSupplier: FormGroup;

  constructor() { }

  ngOnInit() {
    this.formSupplier = new FormGroup({
      name: new FormControl(' ', Validators.required),
      surname: new FormControl(' ', Validators.required),
      contact: new FormControl(' ', Validators.required),
      contactTwo: new FormControl(' ', Validators.required),
      postTown: new FormControl(' ', Validators.required),
    });
  }

  addSupplier() {
    const newSupplier: Supplier = this.formSupplier.value;
    this.addNewSupplier.emit(newSupplier);
    this.formSupplier.reset();
  }

}
