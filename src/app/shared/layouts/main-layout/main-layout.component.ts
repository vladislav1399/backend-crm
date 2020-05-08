import { Component, OnInit } from '@angular/core';
import {WarehouseService} from '../../services/warehouse.service';
import {Warehouse} from '../../interfeices';
import * as $ from 'jquery';
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

  constructor(private warehouseService: WarehouseService) { }

  warehouses: Warehouse[] = [];

  ngOnInit() {
    this.warehouseService.fetch().subscribe( warehouses => {
      this.warehouses = warehouses;
    });
  }

}
