import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {WarehouseService} from '../../../shared/services/warehouse.service';
import {Profession, User, Warehouse} from '../../../shared/interfeices';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  @ViewChild('inputFile', {static: false}) inputFileRef: ElementRef;
  @Output() addNewUser: EventEmitter<User> = new EventEmitter<User>();

  constructor(private warehouseService: WarehouseService) { }

  userForm: FormGroup;
  photoUser: File;
  photoPreview: string | ArrayBuffer = '';
  warehouses: Warehouse[];
  professions: Profession[];

  ngOnInit() {
    this.warehouseService.getAllProfessions().subscribe(
      professions => {
        this.professions = professions;
      });
    this.warehouseService.fetch().subscribe(
      warehouses => {
        console.log(warehouses);
        this.warehouses = warehouses;
      });
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      surname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password2: new FormControl('', [Validators.required, Validators.minLength(3)]),
      accessUser: new FormControl(''),
      instagramUrl: new FormControl(''),
      salary: new FormControl('' ),
      workWarehouse: new FormControl('' ),
    });
  }


  triggerClick() {
    this.inputFileRef.nativeElement.click();
  }

  photoUpload(event: any) {
    const photo = event.target.files[0];
    this.photoUser = photo;
    const reader = new FileReader();
    reader.onload = () => {
      this.photoPreview = reader.result;
    };
    reader.readAsDataURL(photo);
  }

  addUser() {
    if (this.userForm.value.password === this.userForm.value.password2) {
      const user: User = {
        name: this.userForm.value.name,
        surname: this.userForm.value.surname,
        phone: this.userForm.value.phone,
        password: this.userForm.value.password,
        workWarehouse: this.userForm.value.workWarehouse,
        accessUser: this.userForm.value.accessUser,
        salary: this.userForm.value.salary,
        instagramUrl: this.userForm.value.instagramUrl,
        date: new Date(),
        photoUser: this.photoUser
      };
      this.addNewUser.emit(user);
      this.userForm.reset();
      this.userForm.disable();
    }
  }

}
