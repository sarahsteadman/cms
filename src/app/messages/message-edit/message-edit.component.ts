import { Component, EventEmitter, ViewChild, ElementRef, Output } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-edit',
  standalone: false,

  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent {
  @ViewChild('subject') subjectRef: ElementRef;
  @ViewChild('msgText') msgTextRef: ElementRef;
  @Output() newMessage = new EventEmitter<Message>();

  onSendMessage() {

    const message = new Message("1", this.subjectRef.nativeElement.value, this.msgTextRef.nativeElement.value, "Current Sender")
    console.log(message)
    this.newMessage.emit(message)
  }

  onClear() { }
}
