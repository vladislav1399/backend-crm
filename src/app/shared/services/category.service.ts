import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Category, Result} from '../interfeices';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) { }

  fetch(): Observable<Category[]> {
    return this.http.get<Category[]>('/api/category');
  }

  createCategory(newCategory: Category): Observable<Result> {
    return this.http.post<Result>('/api/category', newCategory);
  }

  fetchCategoryById(categoryId: string): Observable<Category> {
    return this.http.get<Category>(`/api/category/${categoryId}`);
  }

  updateCategory(category: Category): Observable<Result> {
    return  this.http.patch<Result>(`/api/category/${category._id}`, category);
  }

  removeCategory(categoryId: string): Observable<Result> {
    return  this.http.delete<Result>(`/api/category/${categoryId}`);
  }

}
