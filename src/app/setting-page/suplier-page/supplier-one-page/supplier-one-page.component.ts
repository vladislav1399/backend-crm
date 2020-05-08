import { Component, OnInit } from '@angular/core';
import {SupplierService} from '../../../shared/services/supplier.service';
import {Brand, Supplier} from '../../../shared/interfeices';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BrandService} from '../../../shared/services/brand.service';

@Component({
  selector: 'app-supplier-one-page',
  templateUrl: './supplier-one-page.component.html',
  styleUrls: ['./supplier-one-page.component.css']
})
export class SupplierOnePageComponent implements OnInit {

  constructor(private supplierService: SupplierService,
              private route: ActivatedRoute,
              private toastrService: ToastrService,
              private router: Router,
              private brandService: BrandService) { }

  supplier: Supplier;
  loading = false;
  formSupplier: FormGroup;
  brands: Brand[] = [];
  reviewForm: FormGroup;

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe(params => {
      this.supplierService.getSupplierById(params.id).subscribe(
        supplier => {
          this.supplier = supplier;
          console.log(this.supplier)
          this.brandService.fetch().subscribe( brands => {
          this.brands = brands;
          this.formSupplier = new FormGroup({
            name: new FormControl(this.supplier.name, Validators.required),
            surname: new FormControl(this.supplier.surname, Validators.required),
            contact: new FormControl(this.supplier.contact, Validators.required),
            contactTwo: new FormControl(this.supplier.contactTwo, Validators.required),
            postTown: new FormControl(this.supplier.postTown, Validators.required),
          });
          this.loading = false;
          this.reviewForm = new FormGroup({
              text: new FormControl('', [Validators.required, Validators.minLength(10)])
          });
          });
        }
      );
    });

  }

    removeSupplier() {
        const qwerty = Number(prompt('Вы действительно хотите удалить поставщика? тогда введите 1'));
        if (qwerty === 1) {
          this.supplierService.removeSupplier(this.supplier._id).subscribe(result => {
            if (result.status === true) {
              this.toastrService.success(result.message);
              this.router.navigate(['/setting/supplier']);
            }
          });
        }
    }

  saveUpdatedSupplier() {
     const patchSupplier: Supplier = {
       amount: this.supplier.amount,
       name: this.formSupplier.value.name,
       surname: this.formSupplier.value.surname,
       contact: this.formSupplier.value.contact,
       contactTwo: this.formSupplier.value.contactTwo,
       postTown: this.formSupplier.value.postTown
     };

     this.supplierService.updateSupplier(this.supplier._id, patchSupplier).subscribe(
         result => {
            if (result.status === true) {
              this.toastrService.success(result.message);
            } else {
              this.toastrService.error(result.message);
            }
     });

     console.log(patchSupplier);
  }

  removeBrand(brandSupplier: any) {

    brandSupplier.operator = '-';
    const brnsplTransf: any  = {
      name: brandSupplier.brandName,
      _id: brandSupplier.id
    };
    this.supplierService.patchBrandToSupplier(this.supplier._id, brandSupplier).subscribe( result => {
      if (result.status === true) {
        this.supplier.brands.splice(this.supplier.brands.indexOf(brandSupplier), 1);
        this.brands.push(brnsplTransf);
        this.toastrService.success(result.message);
      } else {
        this.toastrService.error(result.message);
      }
    });
  }

  addBrand(brand: Brand) {
    brand.operator = '+';
    this.supplierService.patchBrandToSupplier(this.supplier._id, brand).subscribe( result => {
      if (result.status === true) {
        const brnsplTransf: any  = {
          brandName: brand.name,
          id: brand._id
        };
        this.supplier.brands.push(brnsplTransf);
        this.brands.splice(this.brands.indexOf(brand), 1);
        this.toastrService.success(result.message);
      } else {
        this.toastrService.error(result.message);
      }
    });
  }

  addNewReview() {
    if (this.supplier.review.length === 0) {
      this.supplier.review = [];
    }
    const newReview: any = this.reviewForm.value;
    this.supplierService.addCommitToSupplier(this.supplier._id, newReview).subscribe( result => {
          if (result.status === true) {
            this.reviewForm.reset();
            this.toastrService.success(result.message);
            newReview.date = new Date();
            this.supplier.review.push(newReview);
          } else {
            this.toastrService.error(result.message);
          }
    });
  }
}
