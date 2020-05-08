import {Component, Input, OnInit} from '@angular/core';
import {Purchase} from '../../shared/interfeices';

@Component({
  selector: 'app-table-purchase-block',
  templateUrl: './table-purchase-block.component.html',
  styleUrls: ['./table-purchase-block.component.css']
})
export class TablePurchaseBlockComponent implements OnInit {
  @Input() purchases: Purchase[] = [];

  constructor() { }

  ngOnInit() {
  }

}
