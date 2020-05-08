import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Supplier} from '../../../shared/interfeices';

@Component({
  selector: 'app-top-block-form',
  templateUrl: './top-block-form.component.html',
  styleUrls: ['./top-block-form.component.css']
})
export class TopBlockFormComponent implements OnInit {

  @Input() suppliers: Supplier[] = [];

  @Output() statusPurchase: EventEmitter<string> = new EventEmitter<string>();
  @Output() supplierPurchase: EventEmitter<string> = new EventEmitter<string>();
  @Output() cancellationPurchase: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  changeStatus(event) {
    this.statusPurchase.emit(event.target.value);
  }

  changeSupplier(event) {
    this.supplierPurchase.emit(event.target.value);
  }

  changeCancellation(event) {
    this.cancellationPurchase.emit(event.target.value);
  }
}
