import { Component, OnInit } from '@angular/core';
import {Supplier} from '../../shared/interfeices';
import {SupplierService} from '../../shared/services/supplier.service';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-suplier-page',
  templateUrl: './suplier-page.component.html',
  styleUrls: ['./suplier-page.component.css']
})
export class SupplierPageComponent implements OnInit {

  constructor(private supplierService: SupplierService,
              private toastService: ToastrService) { }


  suppliers: Supplier[] = [];
  loading = false;

  ngOnInit() {
    this.loading = true;
    this.supplierService.fetchSupplier().subscribe( suppliers => {
      this.suppliers = suppliers;
      this.loading = false;
    });
  }

  addSupplier(event: Supplier) {
      this.supplierService.createSupplier(event).subscribe( result => {
        if (result.status === true) {
          this.suppliers.push(event);
          this.toastService.show(result.message);
        } else {
          this.toastService.show(result.message);
        }
      });
  }
}
