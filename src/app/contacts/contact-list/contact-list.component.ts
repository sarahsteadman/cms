import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-contact-list',
  standalone: false,
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[];
  private conChangeSub: Subscription;
  searchTerm: string;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    this.conChangeSub = this.contactService.contactUpdated.subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      })
  }
  ngOnDestroy(): void {
    this.conChangeSub.unsubscribe();
  }
  search(searchValue: string) {
    this.searchTerm = searchValue;
    console.log(searchValue)
  }
}
