import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';



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
  addMessage(newMessage: Message) {
    if (!newMessage) {
      return
    }
    newMessage.id = ""
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<{ message: string, msg: Message }>(this.url,
      newMessage,
      { headers: headers })

      .subscribe(
        (responseData) => {
          this.messages.push(responseData.msg);
        }
      );
  }

  updateMessage(originalMessage: Message, newMessage: Message) {
    if (!originalMessage || !newMessage) {
      return;
    }

    const pos = this.messages.findIndex(d => d.id === originalMessage.id);

    if (pos < 0) {
      return;
    }

    newMessage.id = originalMessage.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put(this.url + originalMessage.id,
      newMessage, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.messages[pos] = newMessage;
        }
      );
  }
  deleteMessage(message: Message): void {
    if (!message) {
      return
    }
    let pos = this.messages.indexOf(message)
    if (pos < 0) {
      return
    }
    this.http.delete(this.url + message.id)
      .subscribe(
        (response: Response) => {
          this.messages.splice(pos, 1);
        }
      );
  }
}
