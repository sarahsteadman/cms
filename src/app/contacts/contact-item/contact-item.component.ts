import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-item',
  standalone: false,

  templateUrl: './contact-item.component.html',
  styleUrl: './contact-item.component.css'
})
export class ContactItemComponent {
  @Input() contact: Contact;
  @Output() contactSelected = new EventEmitter<void>

  constructor() { }


  ngOnInit() { }

  onSelected() {
    console.log('Contact selected:', this.contact);
    this.contactSelected.emit();
  }
}
