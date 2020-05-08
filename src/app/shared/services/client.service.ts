import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Client, Result} from '../interfeices';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  fetch(): Observable<Client[]> {
    return this.http.get<Client[]>('/api/client');
  }

  fetchClientById(clientId: string): Observable<Client> {
    return this.http.get<Client>(`/api/client/${clientId}`);
  }

  updateClient(updateClient: Client, clientId: string): Observable<Result> {
    return this.http.patch<Result>(`/api/client/${clientId}`, updateClient);
  }

  removeClient(clientId: string): Observable<Result> {
    return this.http.delete<Result>(`/api/client/${clientId}`);
  }

  create(client: Client): Observable<Client> {
   return  this.http.post<Client>('/api/client', client);
  }
}
