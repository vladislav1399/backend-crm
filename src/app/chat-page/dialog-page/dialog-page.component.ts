import { Component, OnInit } from '@angular/core';
import {UserService} from '../../shared/services/user.service';
import {PrivateMessage, User} from '../../shared/interfeices';
import {AuthService} from '../../shared/services/auth.service';
import {ChatService} from '../../shared/services/chat.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-dialog-page',
  templateUrl: './dialog-page.component.html',
  styleUrls: ['./dialog-page.component.css']
})
export class DialogPageComponent implements OnInit {

  constructor(private userService: UserService,
              private authService: AuthService,
              private chatService: ChatService,
              private toastrService: ToastrService) { }

  users: any = [];
  userYou: any = this.authService.getUserForToken();
  loading = false;
  recipientUserId: string;
  messages: PrivateMessage[] = [];

  ngOnInit() {
    this.loading = true;
    this.userService.fetch().subscribe( users => {
      const candidate = users.find(u => u._id === this.userYou.userId);
      this.userYou.accessUser = candidate.accessUser;
      users.splice(users.indexOf(candidate), 1);
      this.users = users;
      this.loading = false;
    });
  }


  getMessages(recipientId: string) {
    this.recipientUserId = recipientId;
    this.chatService.getMessagesForUser(this.userYou.userId, this.recipientUserId).subscribe( messages => {

      this.messages = messages;
      console.log(this.messages)
    });
  }

  postMessage(textMessage) {
    const newMessage: PrivateMessage = {
      date: new Date(),
      userPost: this.userYou.userId,
      userRecipient: this.recipientUserId,
      message: textMessage
    };
    this.chatService.postNewMessage(newMessage).subscribe( result => {
      this.toastrService.success(result.message)
    });
  }

}
