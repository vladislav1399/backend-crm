import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Profession, Result, User} from '../interfeices';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }


fetch(): Observable<User[]> {
    return this.http.get<User[]>('/api/setting/users');
}

fetchUserById(userId: string): Observable<User> {
    return this.http.get<User>(`/api/setting/users/${userId}`);
}

createUser(user: any, image?: File): Observable<Result> {
    const fd = new FormData();

    if (image && image.name) {
      fd.append('image', image, image.name);
    }

    fd.append('name', user.name);
    fd.append('surname', user.surname);
    fd.append('phone', user.phone);
    fd.append('password', user.password);
    fd.append('workWarehouse', user.workWarehouse);
    fd.append('accessUser', user.accessUser);
    fd.append('salary', String(user.salary));
    fd.append('instagramUrl', user.instagramUrl);

    return this.http.post<Result>('/api/setting/users', fd);
}

removeUser(id: string): Observable<Result> {
    return this.http.delete<Result>(`/api/setting/users/${id}`);
}


fetchProfessions(): Observable<Profession[]> {
    return this.http.get<Profession[]>('/api/setting/professions');
}

createProfessions(profession: Profession): Observable<Result> {
    return this.http.post<Result>('/api/setting/professions', profession);
  }

  removeProfession(professionId: string): Observable<Result>{
    return this.http.delete<Result>(`/api/setting/professions/${professionId}`);
  }

  updateUser(updatedInfo: any): Observable<Result> {
    return this.http.patch<Result>(`/api/setting/users/${updatedInfo._id}`, updatedInfo);
  }





















}
