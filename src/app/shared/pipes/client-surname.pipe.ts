import { Pipe, PipeTransform } from '@angular/core';
import {Client} from '../interfeices';

@Pipe({
  name: 'clientSurname'
})
export class ClientSurnamePipe implements PipeTransform {

  transform(clients: Client[] = [], searchClientForSurname: string, fieldName: string): Client[] {
    if (clients.length === 0 || searchClientForSurname === '') {
      return clients;
    }
    return clients.filter( client => client[fieldName].toLowerCase().indexOf(searchClientForSurname.toLowerCase()) !== -1);
  }

}
