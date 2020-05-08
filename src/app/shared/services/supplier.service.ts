import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Result, Supplier} from '../interfeices';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  constructor(private http: HttpClient) { }

  fetchSupplier(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>('/api/supplier');
  }

  getSupplierById(supplierId: string): Observable<Supplier> {
  return this.http.get<Supplier>(`/api/supplier/${supplierId}`);
  }

  createSupplier(newSupplier: Supplier): Observable<Result> {
    return this.http.post<Result>('/api/supplier', newSupplier);
  }

  patchBrandToSupplier(supplierId: string, brandSupplier: {}): Observable<Result> {
    return this.http.patch<Result>(`/api/supplier/brands/${supplierId}`, brandSupplier);
  }

  addCommitToSupplier(supplierId: string, commit: any, ): Observable<Result> {
    return this.http.patch<Result>(`/api/supplier/commit/${supplierId}`, commit);
  }

  removeSupplier(supplierId: string): Observable<Result> {
    return this.http.delete<Result>(`/api/supplier/${supplierId}`);
  }

  updateSupplier(supplierId: string, supplier: Supplier): Observable<Result> {
    return this.http.patch<Result>(`/api/supplier/${supplierId}`, supplier);
  }
}
