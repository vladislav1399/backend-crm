import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Result, Sale} from '../interfeices';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private http: HttpClient) { }

  createSale(newSale: Sale): Observable<Result> {
    return this.http.post<Result>('/api/sale', newSale);
  }

  fetchSaleFromWarehouse(warehouseId: string): Observable<Sale[]> {
    return this.http.get<Sale[]>(`/api/sale/warehouse/${warehouseId}`);
  }

  getSaleById(saleId: string): Observable<Sale> {
    return this.http.get<Sale>(`/api/sale/list/${saleId}`);
  }

  getAllSale(): Observable<Sale[]> {
    return this.http.get<Sale[]>('/api/sale/count');
  }
  updateSale(sale: Sale): Observable<Result> {
    return this.http.patch<Result>(`/api/sale/${sale._id}`, sale);
  }
  removeSale(saleId: string): Observable<Result> {
    return this.http.delete<Result>(`/api/sale/${saleId}`);
  }
}
