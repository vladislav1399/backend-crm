import {Component, Input, OnInit} from '@angular/core';
import {SpaceOrder} from '../../../shared/interfeices';

@Component({
  selector: 'app-order-space-list',
  templateUrl: './order-space-list.component.html',
  styleUrls: ['./order-space-list.component.css']
})
export class OrderSpaceListComponent implements OnInit {

  @Input() spaceOrders: SpaceOrder[] = [];

  constructor() { }

  ngOnInit() {
    console.log(this.spaceOrders)

  }

}
