import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Cash} from '../interfeices';

@Injectable({
  providedIn: 'root'
})
export class CashService {

  constructor(private http: HttpClient) { }

  fetchCashByWarehouse(idWarehouse: string): Observable<Cash[]> {
    return this.http.get<Cash[]>(`/api/cash/${idWarehouse}`);
  }

  fetchCashByDate(idWarehouse: string, dataOt: Date,  dataDo: Date): Observable<Cash[]> {
    const data = {
      idWarehouse,
      dataOt,
      dataDo
    };
    return this.http.post<Cash[]>(`/api/cash/date/stat`, data);
  }



}
