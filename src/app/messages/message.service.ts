import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messages: Message[] = [];
  messageSelected = new EventEmitter<Message>();
  messageUpdated = new EventEmitter<Message[]>();
  private url: string = "https://cms-wdd-430-8b69d-default-rtdb.firebaseio.com/messages.json";

  constructor(private http: HttpClient) {
    this.fetchMessages();
  }
  getMessages() {
    return this.messages.slice();
  }
  getMessage(id: string) {
    for (let message of this.messages) {
      if (message.id == id) {
        return message
      }
    }
    return null
  }
  addMessage(message: Message) {
    this.messages.push(message)
    this.messageUpdated.emit(this.messages.slice())
    this.storeMessages();
  }
  async fetchMessages() {
    try {
      this.messages = await this.http.get<Message[]>(this.url).toPromise() || [];
      this.messageUpdated.next(this.messages.slice());
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }
  storeMessages() {
    this.http.put(this.url, this.messages).subscribe(
      response => console.log(response),
      error => console.error("Error storing messages:", error)
    );
  }
}
