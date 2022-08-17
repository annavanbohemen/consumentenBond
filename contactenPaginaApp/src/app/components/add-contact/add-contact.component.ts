import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/service/contact.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {

  work = new FormControl('');
  name = new FormControl('');
  email = new FormControl('');
  phone = new FormControl('');

  basic = false;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
  }

  checkChange() {
    this.basic = !this.basic
  }

  onSubmit() {
    let contactParams = {
        work: this.work.value,
        name: this.name.value,
        email: this.email.value,
        phone: this.phone.value,	
      }
      
      this.contactService.postContact(contactParams)
      .subscribe((res: any) => {
        console.log('contact has been saved', res)
      })
    }

}
