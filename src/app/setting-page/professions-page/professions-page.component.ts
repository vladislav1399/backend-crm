import { Component, OnInit } from '@angular/core';
import {UserService} from '../../shared/services/user.service';
import {Profession} from '../../shared/interfeices';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-professions-page',
  templateUrl: './professions-page.component.html',
  styleUrls: ['./professions-page.component.css']
})
export class ProfessionsPageComponent implements OnInit {

  constructor(private userService: UserService,
              private toastrService: ToastrService) { }

  loading = false;
  professions: Profession[];
  formProfession: FormGroup;

  ngOnInit() {
    this.loading = true;
    this.formProfession = new FormGroup({
      professionName: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
    this.userService.fetchProfessions().subscribe(
      professions => {
        this.professions = professions;
        this.loading = false;
      }
    );
  }

  addNewProfession() {
    this.userService.createProfessions(this.formProfession.value).subscribe(result => {
      if (result.status === true) {
        this.professions.push(this.formProfession.value);
        this.formProfession.reset();
        this.toastrService.success(result.message);
      } else {
        this.toastrService.error(result.message);
      }
    });
  }

  removeProfession(profession: Profession) {
    const qwerty = Number(prompt('Если вы хотите удалить должность напишите 1'));
    if (qwerty === 1) {
      this.userService.removeProfession(String(profession._id)).subscribe(result => {
        if (result.status === true) {
          this.professions.splice(this.professions.indexOf(profession), 1);
          this.toastrService.success(result.message);
        } else {
          this.toastrService.warning(result.message);
        }
      });
    } else {
      this.toastrService.warning('Что то пошло не так, Попробуйте удалить еще раз');
    }
  }
}
