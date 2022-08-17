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
  basic = false;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    // get contacts from service
    this.contactService.getContacts().subscribe(contacts => {
        this.Contacts = contacts.contacts;
      })

      // remove after testing
      this.Contacts = [
      {
        contact: 'prive',
        name: 'John Doe',
      },
      {
        contact: 'werk',
        name: 'John Doe',
        email: 'john@doe.nl',	
        phone: '0612345678'
      },
      {
        contact: 'prive',
        name: 'Piet Zwart'
      },
      {
        contact: 'werk',
        name: 'Piet Zwart',
        email: 'piet@zwart.nl',	
        phone: '0612345678'
      }
      ]

      this.capitalizeFirstLetter(this.Contacts)
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
