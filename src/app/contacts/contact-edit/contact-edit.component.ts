import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-contact-edit',
  standalone: false,

  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css'
})
export class ContactEditComponent implements OnInit {
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
      if (!this.id) {
        this.editMode = false;
        return
      }
      this.originalContact = this.contactService.getContact(this.id)
      if (!this.originalContact) {
        return
      }
      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact));
      console.log(this.originalContact.group)
      if (this.originalContact.group) {
        console.log("Group exists")
        this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group));
        console.log(this.groupContacts)
      }
    })
  }
  onRemoveItem(index: number): void {
    this.groupContacts.splice(index, 1);
  }

  onCancel(): void {
    this.router.navigate(['/contacts']);
  }
  onAddItem(form: NgForm) {
    const value = form.value;
    const newContact = new Contact("1", value.name, value.email, value.phone, value.imageUrl, this.groupContacts)
    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }
    this.router.navigate(['/contacts']);
  }

  onDrop(event: CdkDragDrop<Contact[]>) {
    const droppedContact: Contact = event.item.data;

    let inGroup = this.groupContacts.find(contact => contact.id == droppedContact.id)

    if (!inGroup) {
      this.groupContacts.push(droppedContact);
    }
  }
}
