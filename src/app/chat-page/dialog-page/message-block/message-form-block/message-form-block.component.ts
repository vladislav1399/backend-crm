import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-message-form-block',
  templateUrl: './message-form-block.component.html',
  styleUrls: ['./message-form-block.component.css']
})
export class MessageFormBlockComponent implements OnInit {
  @Output() textMessage: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  messageForm: FormGroup;


  ngOnInit() {
    this.messageForm = new FormGroup({
        message: new FormControl('', [Validators.required, Validators.minLength(1)])
    });
  }

  sendMessage() {
      this.textMessage.emit(this.messageForm.value.message);
  }

  resetForm() {
    this.messageForm.reset();
  }

}
