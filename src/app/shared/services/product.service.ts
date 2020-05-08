import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product, Result} from '../interfeices';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  fetch(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/product');
  }

  fetchByCategoryId(categoryId: string): Observable<Product[]> {
    return this.http.get<Product[]>(`/api/product/${categoryId}`);
  }

  create(newProduct: Product): Observable<Result> {
    return this.http.post<Result>('/api/product', newProduct);
  }

  fetchById(productId: string): Observable<Product> {
    return this.http.get<Product>(`/api/product/product-one/${productId}`);
  }

  updateProduct(productId: string, product: Product): Observable<Result> {
    return this.http.patch<Result>(`/api/product/product-one/${productId}`, product);
  }

  removeProduct(productId: string): Observable<Result> {
    return this.http.delete<Result>(`/api/product/product-one/${productId}`);
  }

}
