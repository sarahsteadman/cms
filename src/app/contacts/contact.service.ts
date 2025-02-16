import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts: Contact[] = MOCKCONTACTS;
  contactSelected = new EventEmitter<Contact>();
  contactDeleted = new EventEmitter<Contact[]>();


  constructor() { }
  getContacts() {
    return this.contacts.slice();
  }
  getContact(id: string) {
    for (let contact of this.contacts) {
      if (contact.id == id) {
        return contact
      }
    }
    return null
  }
  deleteContact(contact: Contact): void {
    const index = this.contacts.indexOf(contact);
    if (index < 0) {
      return;
    }
    this.contacts.splice(index, 1);
    this.contactDeleted.emit(this.contacts.slice());
  }

}
