import {Component, Input, OnInit} from '@angular/core';
import {PrivateMessage} from '../../../shared/interfeices';

@Component({
  selector: 'app-message-block',
  templateUrl: './message-block.component.html',
  styleUrls: ['./message-block.component.css']
})
export class MessageBlockComponent implements OnInit {

  @Input() messages: PrivateMessage[] = [];

  constructor() { }

  ngOnInit() {

  }
}
