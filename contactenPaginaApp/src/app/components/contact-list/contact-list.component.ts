import { Component, OnInit } from '@angular/core';
import { IContact } from 'src/app/models/contact';
import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  Contacts: IContact[] = [];
  loading = false;
  basic = false;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    // get contacts from service
    this.getContacts();
  }

  getContacts() {
    this.contactService.getContacts().subscribe(res => {
      this.Contacts = res.data.contacts;
    })
  }

  deleteContact(contact: IContact){
    this.loading = true;
    if(contact.id){
      this.contactService.removeContacts(contact.id).subscribe(res => {
        this.getContacts();
        this.loading = false;
      })
    }
  }

  capitalizeFirstLetter(contacts: IContact[]) {
    for(let i = 0; i < contacts.length; i++) {
      contacts[i].contact = contacts[i].contact.charAt(0).toUpperCase() + contacts[i].contact.slice(1)
    }
  }

  checkChange() {
    this.basic = !this.basic
  }

}
