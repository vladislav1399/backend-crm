import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Result, State} from '../interfeices';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  constructor(private http: HttpClient) { }

  fetchExpensesState(): Observable<State[]> {
    return this.http.get<State[]>('/api/state/state-expenses');
  }

  createStateExpenses(stateExpenses: State): Observable<Result> {
    return this.http.post<Result>('/api/state/state-expenses', stateExpenses);
  }

  fetchIncomeState(): Observable<State[]> {
    return this.http.get<State[]>('/api/state/state-income');
  }

  createStateIncome(stateIncome: State): Observable<Result> {
    return this.http.post<Result>('/api/state/state-income', stateIncome);
  }

  removeExpenseState(stateId: string): Observable<Result> {
    return this.http.delete<Result>(`/api/state/expenses/${stateId}`);
  }

  removeIncomeState(stateId: string): Observable<Result> {
    return this.http.post<Result>(`/api/state/income/${stateId}`, stateId);
  }

}
