import { Component, OnInit } from '@angular/core';
import {WarehouseService} from '../../../services/warehouse.service';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {Warehouse} from '../../../interfeices';
import {UserService} from '../../../services/user.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private warehouseService: WarehouseService,
              private authService: AuthService,
              private router: Router,
              private userService: UserService,
              private toastrService: ToastrService) { }

  warehouses: Warehouse[];
  warehouseId: string;
  warehouseName: string;
  loading = false;
  userWork: any;
  user: any;

  ngOnInit() {
    this.loading = true;
    // Получаю данные пользователя
    this.userWork = this.authService.getUserForToken();
    this.userService.fetchUserById(this.userWork.userId).subscribe( user => {
          this.user = user;
      // Получаю список складов
          this.warehouseService.fetch().subscribe(
        (warehouses) => {
          // Получив рабочий склад пользователя, по ID достаю склад
          this.warehouseService.fetchWarehouseById(this.userWork.workWarehouse).subscribe(
            warehouseUser => {
              this.warehouseId = warehouseUser._id;
              this.warehouseName = warehouseUser.name;
              localStorage.setItem('warehouseNow', this.warehouseId);
              localStorage.setItem('warehouseName', this.warehouseName);
              // Записываю склад в сторедж  // Склад на данный момент
              // Получаю данные пользователя
              const candidate = warehouses.find(p => p._id === this.userWork.workWarehouse );
              const index = warehouses.indexOf(candidate);
              // Получаю данные пользователя
              warehouses.splice(index, 1 );
              // Получаю данные пользователя
              this.warehouses = warehouses;
              this.loading = false;
            });
        });
    });

  }

  changeWarehouse(event) {
    localStorage.setItem('warehouseNow', event.target.value);
    this.warehouseService.fetchWarehouseById(event.target.value).subscribe(ware => {
      localStorage.setItem('warehouseName', ware.name);
      this.toastrService.success(`Склад - ${ware.name}  успешно выбран`);
      setTimeout( () => {
        this.router.navigate([`/`]);
      }, 700);

    });
  }

  logout() {
      this.authService.logout();
      this.router.navigate(['/login']);
  }

}
