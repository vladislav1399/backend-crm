import { Component, OnInit } from '@angular/core';
import {UserService} from '../../shared/services/user.service';
import {User} from '../../shared/interfeices';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent implements OnInit {

  constructor(private userService: UserService,
              private toastrService: ToastrService) { }

  users: User[];
  loading = false;
  ngOnInit() {
    this.loading = true;
    this.userService.fetch().subscribe(
      users => {
        this.users = users;
        console.log(this.users)
        this.loading = false;
      });
  }

  addNewUser(event: User, ) {
    this.userService.createUser(event, event.photoUser).subscribe(
      result => {
        this.toastrService.success(result.message);
        this.userService.fetch().subscribe(
          users => {
            this.users = users;
          }
        );
      });
  }

  removeUser(user: User) {
    const question = Number(prompt(`Введите 1 если хотите удалить пользователя! - ${user.name} ${user.surname}` ));
    if ( question === 1 ) {
        this.userService.removeUser(user._id).subscribe( result => {
          this.toastrService.success(result.message);
          this.users.splice(this.users.indexOf(user), 1);
        });
    } else {
      this.toastrService.show('Удаление пользователя отменено!');
    }
  }
}
