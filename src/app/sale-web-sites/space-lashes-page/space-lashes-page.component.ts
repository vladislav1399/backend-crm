import { Component, OnInit } from '@angular/core';
import {SpaceLashesService} from '../../shared/services/space-lashes.service';
import {SpaceOrder} from '../../shared/interfeices';

@Component({
  selector: 'app-space-lashes-page',
  templateUrl: './space-lashes-page.component.html',
  styleUrls: ['./space-lashes-page.component.css']
})
export class SpaceLashesPageComponent implements OnInit {

  constructor(private spaceLashesService: SpaceLashesService) { }

  spaceOrders: SpaceOrder[] = [];
  loading = false;
  dateOt: any;
  dateDo: any;

  ngOnInit() {
    this.loading = true;
    this.spaceLashesService.fetchOrdersSpace().subscribe(spaceOrders => {
      this.spaceOrders = spaceOrders;
      console.log(spaceOrders)
      this.loading = false;
    });
  }

  changeDate() {

  }
}
