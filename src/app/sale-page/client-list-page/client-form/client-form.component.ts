import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ClientService} from '../../../shared/services/client.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Client} from '../../../shared/interfeices';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {

  @Output() pushNewClient: EventEmitter<Client> = new EventEmitter<Client>();

  constructor(private clientService: ClientService,
              private toastrService: ToastrService) { }

  clientForm: FormGroup;

  ngOnInit() {
      this.clientForm = new FormGroup({
        name: new FormControl(''),
        surname: new FormControl('', [Validators.required, Validators.minLength(3)]),
        phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
        discount: new FormControl(0, Validators.required),
      });
  }

  addNewClient() {
        const newClient: Client = this.clientForm.value;
        this.clientService.create(newClient).subscribe( client => {
          this.clientForm.reset();
          this.pushNewClient.emit(client);
          console.log(client);
        });
  }
}
