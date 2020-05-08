import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Client, Sale} from '../../../shared/interfeices';

@Component({
  selector: 'app-info-block-sale',
  templateUrl: './info-block-sale.component.html',
  styleUrls: ['./info-block-sale.component.css']
})
export class InfoBlockSaleComponent implements OnInit {

  @Input() sale: Sale;
  @Input() clients: Client[];
  @Input() cancellationNow: string;
  @Output() cancellation: EventEmitter<string> = new EventEmitter<string>();
  @Output() chackedClient: EventEmitter<Client> = new EventEmitter<Client>();
  @Output() status: EventEmitter<string> = new EventEmitter<string>();
  @Output() track: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }
  client: Client;
  cancellationForm: FormGroup;
  clientForm: FormGroup;
  statusForm: FormGroup;
  ttnForm: FormGroup;
  trackNumber = '';

  ngOnInit() {
    this.client = this.sale.client;
    this.trackNumber = this.sale.track;
    this.cancellationForm = new FormGroup({
      cancellation: new FormControl(this.sale.cancellation, [Validators.required, Validators.minLength(5)])
    });
    this.clientForm = new FormGroup({
      // @ts-ignore
      client: new FormControl(this.sale.client._id)
    });
    this.statusForm = new FormGroup({
      status: new FormControl(this.sale.status, [Validators.required, Validators.minLength(5)])
    });
  }

  changeCancellation(event) {
    this.cancellation.emit(event.target.value);
  }

  changeClient(event) {
    const client = this.clients.find( c => c._id === event.target.value);
    this.chackedClient.emit(client);
  }

  changeStatus(event) {
    this.status.emit(event.target.value);
  }

  tracking(event) {
    this.trackNumber = event.target.value;
    this.track.emit(this.trackNumber);
  }
}
