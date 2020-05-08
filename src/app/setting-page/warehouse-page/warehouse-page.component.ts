import { Component, OnInit } from '@angular/core';
import {WarehouseService} from '../../shared/services/warehouse.service';
import {Warehouse} from '../../shared/interfeices';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-warehouse-page',
  templateUrl: './warehouse-page.component.html',
  styleUrls: ['./warehouse-page.component.css']
})
export class WarehousePageComponent implements OnInit {

  constructor(private warehouseService: WarehouseService,
              private toastrService: ToastrService,
              private router: Router) { }

  warehouses: Warehouse[];
  loading = false;

  ngOnInit() {
    this.loading = true;
    this.warehouseService.fetch().subscribe(
      warehouses => {
        this.warehouses = warehouses;
        this.loading = false;
      }
    );
  }

  addNewWarehouses(event: Warehouse) {
    this.loading = true;
    this.warehouseService.createWarehouse(event).subscribe(result => {
      this.loading = false;
      if (result.status === true) {
        this.warehouses.push(event);
        this.toastrService.show(result.message);
        this.router.navigate(['/setting']);
      }
    });
  }
}
