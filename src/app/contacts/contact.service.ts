import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts: Contact[] = []
  contactSelected = new Subject<Contact>();
  contactUpdated = new Subject<Contact[]>();
  maxContactId: number
  private url: string = "https://cms-wdd-430-8b69d-default-rtdb.firebaseio.com/contacts.json";

  constructor(private http: HttpClient) {
    this.fetchContacts();
  }
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
    if (!newContact) return;

    console.log("Add contact called");
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    console.log(newContact.id);
    this.contacts.push(newContact);
    this.contactUpdated.next(this.contacts.slice());
    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) return;

    let pos = this.contacts.indexOf(originalContact);
    if (pos < 0) return;

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.contactUpdated.next(this.contacts.slice());
    this.storeContacts();
  }

  deleteContact(contact: Contact): void {
    if (!contact) return;

    let pos = this.contacts.indexOf(contact);
    if (pos < 0) return;

    this.contacts.splice(pos, 1);
    this.contactUpdated.next(this.contacts.slice());
    this.storeContacts();
  }

  async fetchContacts() {
    try {
      this.contacts = await this.http.get<Contact[]>(this.url).toPromise() || [];
      this.maxContactId = this.getMaxId();
      this.contactUpdated.next(this.contacts.slice());
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  }

  storeContacts() {
    this.http.put(this.url, this.contacts).subscribe(
      response => console.log(response),
      error => console.error("Error storing contacts:", error)
    );
  }
}
