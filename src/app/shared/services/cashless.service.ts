import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Cashless} from '../interfeices';

@Injectable({
  providedIn: 'root'
})
export class CashlessService {
  constructor(private http: HttpClient) { }

  fetchCashlessByWarehouse(idWarehouse: string): Observable<Cashless[]> {
    return this.http.get<Cashless[]>(`/api/cashless/${idWarehouse}`);
  }

  fetchCashlessByDate(idWarehouse: string, dataOt: Date,  dataDo: Date): Observable<Cashless[]> {
    const data = {
      idWarehouse,
      dataOt,
      dataDo
    };
    return this.http.post<Cashless[]>(`/api/cashless/${idWarehouse}`, data);
  }
}
