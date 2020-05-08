import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SpaceOrder} from '../interfeices';

@Injectable({
  providedIn: 'root'
})
export class SpaceLashesService {

  constructor(private http: HttpClient) { }


  fetchOrdersSpace(): Observable<SpaceOrder[]> {
    return this.http.get<SpaceOrder[]>(`/space/order`);
  }

  fetchOrderSpaceById(orderId: string): Observable<SpaceOrder> {
      return this.http.get<SpaceOrder>(`/space/order/${orderId}`);
  }



}
