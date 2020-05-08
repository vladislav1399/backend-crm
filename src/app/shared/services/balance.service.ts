import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Balance, LeftoversForWarehouse} from '../interfeices';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  constructor(private http: HttpClient) { }

  fetchAllBalance(): Observable<Balance[]> {
    return this.http.get<Balance[]>('/api/balance');
  }

  getFullBalance(): Observable<Balance[]> {
    return this.http.get<Balance[]>('/api/balance/full');
  }

  fetchBalanceForWarehouse(warehouseId: string): Observable<LeftoversForWarehouse[]> {
    return this.http.get<LeftoversForWarehouse[]>(`/api/balance/warehouse/${warehouseId}`);
  }




}
