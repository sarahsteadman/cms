import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-list',
  standalone: false,

  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {
  messages: Message[] = []

  onNewMessage(message: Message) {
    console.log(message)
    this.messages.push(message)
  }
}
