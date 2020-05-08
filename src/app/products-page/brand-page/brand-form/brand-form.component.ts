import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Brand} from '../../../shared/interfeices';

@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.css']
})
export class BrandFormComponent implements OnInit {
  @Output() addNewBrand: EventEmitter<Brand> = new EventEmitter<Brand>();
  @Input() brands: Brand[];
  constructor() { }

  brandForm: FormGroup;
  ngOnInit() {
    this.brandForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)])
    });
  }

  addBrand() {
  const newBrand = {
    name: this.brandForm.value.name
  };
  this.brandForm.reset();
  this.addNewBrand.emit(newBrand);
  }

}
