import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts: Contact[] = MOCKCONTACTS;
  contactSelected = new Subject<Contact>();
  contactUpdated = new Subject<Contact[]>();
  maxContactId: number

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
  getMaxId(): number {
    let maxId = 0

    for (let contact of this.contacts) {
      let currentId = parseInt(contact.id)

      if (currentId > maxId) {
        maxId = currentId
      }
    }
    return maxId
  }
  addContact(newContact: Contact) {
    if (!newContact) {
      return
    }

    this.maxContactId++
    newContact.id = this.maxContactId.toString()
    this.contacts.push(newContact)
    this.contactUpdated.next(this.contacts.slice())
  }
  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return
    }
    let pos = this.contacts.indexOf(originalContact)
    if (pos < 0) {
      return
    }

    newContact.id = originalContact.id
    this.contacts[pos] = newContact
    this.contactUpdated.next(this.contacts.slice())
  }
  deleteContact(contact: Contact): void {
    if (!contact) {
      return
    }
    let pos = this.contacts.indexOf(contact)
    if (pos < 0) {
      return
    }
    this.contacts.splice(pos, 1)
    this.contactUpdated.next(this.contacts.slice())
  }

}
