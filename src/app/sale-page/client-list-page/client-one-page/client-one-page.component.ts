import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../../shared/services/client.service';
import {Client} from '../../../shared/interfeices';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Toast, ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-client-one-page',
  templateUrl: './client-one-page.component.html',
  styleUrls: ['./client-one-page.component.css']
})
export class ClientOnePageComponent implements OnInit {

  constructor(private clientService: ClientService,
              private route: ActivatedRoute,
              private toastrService: ToastrService) { }

  client: Client;
  loading = false;
  updateClientForm: FormGroup;

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe(params => {
      this.clientService.fetchClientById(params.id).subscribe( client => {
        this.client = client;
        this.updateClientForm = new FormGroup({
          name: new FormControl(this.client.name),
          surname: new FormControl(this.client.surname, [Validators.required, Validators.minLength(3)]),
          phone: new FormControl(this.client.phone, [Validators.required, Validators.minLength(10)]),
          discount: new FormControl(this.client.discount),
          amountPurchase: new FormControl(this.client.amountPurchase.toFixed(1))
        });
        this.loading = false;
      });
    });

  }


  updateClient() {
    const updateClient = this.updateClientForm.value;
    updateClient._id = this.client._id;
    this.clientService.updateClient(updateClient, updateClient._id).subscribe( result => {
      this.toastrService.show(result.message)

    });
  }
}
