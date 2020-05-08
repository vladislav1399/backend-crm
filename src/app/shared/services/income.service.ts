import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Income, Result} from '../interfeices';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(private http: HttpClient) { }

  create(income: Income): Observable<Result> {
    return this.http.post<Result>('/api/income', income);
  }

  fetch(warehouseId: string): Observable<Income[]> {
    return this.http.get<Income[]>(`/api/income/${warehouseId}`);
  }

  getIncomeForDate(warehouseId: string, dateOt: Date, dateDo: Date): Observable<Income[]> {
    const data = {
      warehouseId,
      dateOt,
      dateDo
    };
    return this.http.post<Income[]>(`/api/income/date/stat`, data );
  }


  removeIncome(incomeId: string): Observable<Result> {
    return this.http.delete<Result>(`/api/income/${incomeId}`);
  }

}

