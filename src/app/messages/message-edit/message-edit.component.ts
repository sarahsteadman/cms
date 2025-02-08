import { Component, EventEmitter, ViewChild, ElementRef, Output } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-edit',
  standalone: false,

  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent {
  @ViewChild('subject') subjectRef: ElementRef;
  @ViewChild('msgText') msgTextRef: ElementRef;
  constructor(private messageService: MessageService) { }

  onSendMessage() {

    const message = new Message("1", this.subjectRef.nativeElement.value, this.msgTextRef.nativeElement.value, "24")
    console.log(message)
    this.messageService.addMessage(message)
  }

  onClear() { }
}
