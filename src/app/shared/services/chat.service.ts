import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PrivateMessage, Result} from '../interfeices';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  postNewMessage(newMessage: PrivateMessage): Observable<Result> {
    return this.http.post<Result>('/api/chat/private', newMessage);
  }

  getMessagesForUser(userPostId: string, userRecipientId: string): Observable<PrivateMessage[]> {
    const userRec = {
      userRecipient: userRecipientId
    };

    return this.http.post<PrivateMessage[]>(`/api/chat/private/${userPostId}`, userRec);
  }
}
