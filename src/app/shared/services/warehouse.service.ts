import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Profession, Result, Warehouse} from '../interfeices';

@Injectable({
  providedIn: 'root'
})

export class WarehouseService {
  constructor(private http: HttpClient){}

  fetch(): Observable<Warehouse[]> {
    return this.http.get<Warehouse[]>('/api/setting/warehouse')
  }
  fetchWarehouseById(warehouseId: string): Observable<Warehouse> {
    return this.http.get<Warehouse>(`/api/setting/warehouse/${warehouseId}`);
  }
  createWarehouse(warehouse): Observable<Result>{
    return this.http.post<Result>('/api/setting/warehouse', warehouse);
  }

  getAllProfessions(): Observable<Profession[]> {
    return this.http.get<Profession[]>('/api/setting/professions');
  }

}
