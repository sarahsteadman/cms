import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter',
  standalone: false
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], term: string): unknown {
    if (!term || term.trim().length == 0) {
      return contacts;
    }
    let filteredContacts = [];

    for (let contact of contacts) {
      if (contact.name.toLowerCase().includes(term)) {
        filteredContacts.push(contact)
      }
    }

    if (filteredContacts.length < 1) {
      return contacts
    }
    return filteredContacts
  }

}
