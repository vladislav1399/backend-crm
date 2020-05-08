import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {AnimService} from '../../services/anim.service';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {WarehouseService} from '../../services/warehouse.service';

@Component({
  selector: 'app-login-layout',
  templateUrl: './login-layout.component.html',
  styleUrls: ['./login-layout.component.css']
})

export class LoginLayoutComponent implements OnInit {
  constructor(private authService: AuthService,
              private animService: AnimService,
              private router: Router,
              private userService: UserService,
              private warehouseService: WarehouseService) {
  }
  userCount: number;
  phoneUser = '';
  passwordUser = '';
  FIRST_START = false;
  regUser: FormGroup;
  FIRST_WAREHOUSE = false;
  warehouseForm: FormGroup;

  ngOnInit() {
    this.userService.fetch().subscribe(
      users => {
        this.userCount = users.length;
        if (this.userCount === 0) {this.FIRST_START = true; }
      });

    this.regUser = new FormGroup({
      nameReg: new FormControl('', [Validators.required, Validators.minLength(3)]),
      surnameReg: new FormControl('', [Validators.required, Validators.minLength(3)]),
      phoneReg: new FormControl('', [Validators.required, Validators.minLength(3)]),
      passwordReg: new FormControl('', [Validators.required, Validators.minLength(3)]),
      passwordReg2: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });

    this.warehouseForm = new FormGroup({
      warName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });


  }

  loginUser() {
    if (typeof this.phoneUser === 'string' && this.phoneUser !== '' && this.phoneUser !== null) {
      if (this.passwordUser !== '' && typeof this.phoneUser === 'string' ) {
        const candidate: any = {
          phone: this.phoneUser,
          password: this.passwordUser
        };
        this.authService.login(candidate).subscribe(
          token => {
            this.warehouseService.fetch().subscribe(
              warehouses => {
                if (warehouses.length === 0) {
                  this.FIRST_WAREHOUSE = true;
                } else {
                 const warehouseId: any =  this.authService.getUserForToken().workWarehouse;
                 this.warehouseService.fetchWarehouseById(warehouseId).subscribe( warehouse => {
                   localStorage.setItem('warehouseNow', warehouse._id);
                   localStorage.setItem('warehouseName', warehouse.name);
                   this.router.navigate(['/dashboard']);
                 });
                }
              });
          });
      } else {
        this.animService.toast('Вы не ввели пароль');
        setTimeout( () => {
          this.animService.toast(`Проверьте  </br>Телефон и Пароль!`);
        }, 1000);
      }
    } else {
      this.animService.toast('Что то пошло не так...');
      setTimeout( () => {
        this.animService.toast(`Проверьте  </br>Телефон и Пароль!`);
      }, 1000);
    }
  }


  registerFirstUser() {
    if (this.regUser.value.passwordReg === this.regUser.value.passwordReg2) {
      const firstUser: any = {
        name: this.regUser.value.nameReg,
        surname: this.regUser.value.surnameReg,
        phone: this.regUser.value.phoneReg,
        password: this.regUser.value.passwordReg,
      };

      this.userService.createUser(firstUser).subscribe(result => {
        if (result.status === true) {
          this.animService.toast(result.message);
          this.FIRST_START = false;
          this.regUser.reset();
        } else { this.animService.toast('Что то пошло не так попробуйте заного'); }
      });
    } else {
      this.animService.toast('Пароли не совпадают!');
    }
  }

  createFirstWarehouse() {
    const warehouse = {
      name: this.warehouseForm.value.warName
    };
    this.warehouseService.createWarehouse(warehouse).subscribe(
      result => {
        if (result.status === true) {
          this.animService.toast(result.message);
          this.authService.getUserForToken();
          this.FIRST_WAREHOUSE = false;
          this.router.navigate(['/login']);
          localStorage.clear();
          this.warehouseForm.reset();
        } else {
          this.animService.toast('Что то пошло не так склад не создан повторите попытку');
        }
      });
  }


}
