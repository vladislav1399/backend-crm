import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../interfeices";
import {tap} from "rxjs/operators";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient,
              private jwtHelper: JwtHelperService) { }

  private token = null;
  private candidate: User;

  login(user: User): Observable<{token: string, candidate: User}> {
    return this.http.post<{token: string, candidate: User}>('/api/login', user)
      .pipe(
        tap( ({token} ) => {
        localStorage.setItem('token', token);
          this.setToken(token);
        })
      )}

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string {
      return this.token
}

  isAuthenticated(): boolean {
    return !!this.token;
  }

  logout() {
    this.setToken(null);
    localStorage.clear();
  }

   getUserForToken() {
    const ls = localStorage.getItem('token');
    this.candidate = this.jwtHelper.decodeToken(ls);
    return this.candidate;
  }

  getUserId() {
   const user: any =  this.getUserForToken();
   return user.userId;
  }
}
