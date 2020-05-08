import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrivateService {

  constructor(private http: HttpClient) { }

  fetchStatement(date): Observable<any> {
    return this.http.post<any>('/api/private-bank/statement', date);
  }
}
