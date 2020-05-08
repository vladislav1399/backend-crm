import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Expense, Income, Result} from '../interfeices';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  constructor(private http: HttpClient) { }

  create(expense: Expense): Observable<Result> {
    return this.http.post<Result>('/api/expense', expense);
  }

  fetch(warehouseId: string): Observable<Expense[]> {
    return this.http.get<Expense[]>(`/api/expense/${warehouseId}`);
  }

  getExpensesForDate(warehouseId: string, dateOt: Date, dateDo: Date): Observable<Expense[]> {
    const data = {
      warehouseId,
      dateOt,
      dateDo
    };
    return this.http.post<Expense[]>(`/api/expense/date/stat`, data );
  }

  removeExpense(expenseId: string): Observable<Result> {
    return this.http.delete<Result>(`/api/expense/${expenseId}`);
  }
}
