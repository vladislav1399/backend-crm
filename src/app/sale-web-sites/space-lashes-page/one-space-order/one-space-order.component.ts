import { Component, OnInit } from '@angular/core';
import {SpaceLashesService} from '../../../shared/services/space-lashes.service';
import {SpaceOrder, SpaceOrderProduct} from '../../../shared/interfeices';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-one-space-order',
  templateUrl: './one-space-order.component.html',
  styleUrls: ['./one-space-order.component.css']
})
export class OneSpaceOrderComponent implements OnInit {

  constructor(private spaceLashesService: SpaceLashesService,
              private router: ActivatedRoute) { }


  order: SpaceOrder;
  loading = false;
  orderProducts: SpaceOrderProduct[] = [];

  ngOnInit() {
    this.loading = true;
    this.router.params.subscribe( params => {
      this.spaceLashesService.fetchOrderSpaceById(params.id).subscribe(order => {
        this.order = order;
        this.orderProducts = this.order.list;
        this.loading = false;
      });
    });
  }



}
