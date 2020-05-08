import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Income, Purchase, Result} from '../interfeices';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private http: HttpClient) { }

  fetchPurchase(warehouseId: string): Observable<Purchase[]> {
      return this.http.get<Purchase[]>(`/api/purchase/warehouse/${warehouseId}`);
  }

  createPurchase(purchase: Purchase): Observable<Result> {
    return this.http.post<Result>('/api/purchase', purchase);
  }

  updatePurchase(purchaseId: string,  purchase: any): Observable<Result> {
    return this.http.patch<Result>(`/api/purchase/${purchaseId}`, purchase);
  }

  getPurchaseById(purchaseId: string): Observable<Purchase> {
   return  this.http.get<Purchase>(`/api/purchase/${purchaseId}`);
  }

  deletePurchase(purchaseId: string): Observable<Result> {
    return this.http.delete<Result>(`/api/purchase/${purchaseId}`);
  }

  getPurchaseForDate(warehouseId: string, dateOt: Date, dateDo: Date): Observable<Purchase[]> {
    const data = {
      warehouseId,
      dateOt,
      dateDo
    };
    return this.http.post<Purchase[]>(`/api/purchase/date`, data );
  }


}
