import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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

  constructor(
    private contactService: ContactService,
    private toastr: ToastrService) { }

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
      this.contactService.removeContacts(contact.id).subscribe(
        res => {
        this.toastr.success('contact is verwijderd', '', {positionClass: 'toast-top-center'});
        this.getContacts();
        this.loading = false;
        },
        (err) => {
           this.toastr.error(err, '',  {positionClass: 'toast-top-center'})
          this.loading = false;
        })
    }
  }

  checkChange() {
    this.basic = !this.basic
  }

}
