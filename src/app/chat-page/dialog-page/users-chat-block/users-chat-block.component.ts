import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../shared/interfeices';

@Component({
  selector: 'app-users-chat-block',
  templateUrl: './users-chat-block.component.html',
  styleUrls: ['./users-chat-block.component.css']
})
export class UsersChatBlockComponent implements OnInit {
  @Input() users: User[] = [];
  @Input() userYou: any;
  @Output() recipientId: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  getMessages(user: User) {
      this.recipientId.emit(user._id);
  }
}
