import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messagesChanged = new EventEmitter<Message[]>
  private messages: Message[] = MOCKMESSAGES;
  messageSelected = new EventEmitter<Message>();

  constructor() { }
  getMessages() {
    return this.messages.slice();
  }
  getMessage(id: string) {
    for (let message of this.messages) {
      if (message.id == id) {
        return message
      }
      return null
    }
  }
  addMessage(message: Message) {
    this.messages.push(message)
    this.messagesChanged.emit(this.messages.slice())
  }
}
