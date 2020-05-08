import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../shared/services/client.service';
import {Client} from '../../shared/interfeices';

@Component({
  selector: 'app-client-list-page',
  templateUrl: './client-list-page.component.html',
  styleUrls: ['./client-list-page.component.css']
})
export class ClientListPageComponent implements OnInit {

  constructor(private clientService: ClientService) { }

  clients: Client[] = [];
  searchClientSurname = '';
  searchClientPhone = '';

  ngOnInit() {

    this.clientService.fetch().subscribe( clients => {
      this.clients = clients;
    });
  }

  addClient(client: Client) {
    this.clients.push(client);

  }
}
