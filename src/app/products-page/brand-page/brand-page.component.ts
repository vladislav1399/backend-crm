import {Component, OnInit} from '@angular/core';
import {BrandService} from '../../shared/services/brand.service';
import {Brand} from '../../shared/interfeices';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-brand-page',
  templateUrl: './brand-page.component.html',
  styleUrls: ['./brand-page.component.css']
})
export class BrandPageComponent implements OnInit {

  constructor(private brandService: BrandService,
              private toastrService: ToastrService) { }

  loading = false;
  brands: Brand[] = [];

  ngOnInit() {
    this.loading = true;
    this.brandService.fetch().subscribe( brands => {
      this.brands = brands;
      this.loading = false;
    });
  }

  addNewBrand(event) {
    this.brandService.create(event).subscribe(result => {
      if (result.status === true) {
        this.toastrService.success(result.message);
        this.brandService.fetch().subscribe(brands => {
          this.brands = brands;
        });
      } else {
        this.toastrService.error(result.message);
      }
    });
  }

  removeBrand(brand: Brand) {
    const qwerty = Number(prompt('Вы действитель хотите удалить навсегда торговую марку?. Тогда нажмите 1'));
    if (qwerty === 1) {
        this.brandService.remove(String(brand._id)).subscribe( result => {
          if (result.status === true) {
              this.toastrService.show(result.message);
              this.brands.splice(this.brands.indexOf(brand), 1);
          }
        });
    } else {
      this.toastrService.show('Вы что то сделали не так попробуйте снова!');
    }
  }



}
