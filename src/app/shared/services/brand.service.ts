import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Brand, Result} from '../interfeices';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  constructor(private http: HttpClient) { }


  create(brand: Brand): Observable<Result> {
    return this.http.post<Result>('/api/brand', brand);
  }

  fetch(): Observable<Brand[]> {
    return this.http.get<Brand[]>('/api/brand');
  }

  remove(brandId: string): Observable<Result> {
    return this.http.delete<Result>(`/api/brand/${brandId}`);
  }
}
