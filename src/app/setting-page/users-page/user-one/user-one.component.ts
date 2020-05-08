import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../shared/services/user.service';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {WarehouseService} from '../../../shared/services/warehouse.service';
import {ToastrService} from 'ngx-toastr';
import {Profession, User, Warehouse} from '../../../shared/interfeices';

@Component({
  selector: 'app-user-one',
  templateUrl: './user-one.component.html',
  styleUrls: ['./user-one.component.css']
})
export class UserOneComponent implements OnInit {
  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private warehouseService: WarehouseService,
              private toastrService: ToastrService) { }


  user: any;
  loading = false;
  userForm: FormGroup;
  professions: Profession[] = [];
  professionChange = false;
  newProfession: string;
  warehouses: Warehouse[] = [];
  newWarehouse: string;
  warehousesChange = false;
  warNowUser: string;

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe( param => {
      this.userService.fetchUserById(param.id).subscribe( user => {
        this.user = user;
        this.warNowUser = this.user.workWarehouse._id;
        this.userService.fetchProfessions().subscribe( professions => {
          this.warehouseService.fetch().subscribe( warehouses => {
            console.log(this.warNowUser)
            this.warehouses = warehouses;
          });
          this.professions = professions;
          this.loading = false;
          this.userForm = new FormGroup({
            name: new FormControl(this.user.name, Validators.required),
            surname: new FormControl(this.user.surname, Validators.required),
            salary: new FormControl(this.user.salary, Validators.required),
          });
        });
      });
    });



  }

  changeProfession(event) {
    this.newProfession = event.target.value;
    this.professionChange = true;
  }

  changeWarehouse(event) {
    this.newWarehouse = event.target.value;
    this.warehousesChange = true;
  }



  saveChange() {
    let prof;
    let warehouse;
    if (this.professionChange === true) {
      prof = this.newProfession;
    } else {
      prof = this.user.accessUser._id;
    }

    if (this.warehousesChange === true) {
      warehouse = this.newWarehouse;
    } else {
      warehouse = this.warNowUser;
    }

    const updatedUser: any = {
      _id: this.user._id,
      accessUser: prof,
      name: this.userForm.value.name,
      surname: this.userForm.value.surname,
      salary: this.userForm.value.salary,
      workWarehouse: warehouse
    };

    this.userService.updateUser(updatedUser).subscribe( result => {
      if (result.status === true) {
        this.toastrService.show(result.message);
      } else {
        this.toastrService.show(result.message);
      }

      this.warehousesChange = false;
      this.professionChange = false;
    });


  }


}
