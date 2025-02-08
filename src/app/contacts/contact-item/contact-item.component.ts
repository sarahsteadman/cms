import { Component, Input } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-item',
  standalone: false,
  templateUrl: './contact-item.component.html',
  styleUrl: './contact-item.component.css'
})
export class ContactItemComponent {
  @Input() contact: Contact;

  constructor(private contactService: ContactService) { }

  onSelected() {
    this.contactService.contactSelected.emit(this.contact);
  }
}
