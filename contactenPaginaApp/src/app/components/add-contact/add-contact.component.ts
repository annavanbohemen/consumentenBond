import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/service/contact.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {

  contactForm!: FormGroup;

  basic = false;

  constructor(private contactService: ContactService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      work: new FormControl('', Validators.required),
      email: new FormControl(''),
      phone: new FormControl('')
      
    })
  }

  checkChange() {
    this.basic = !this.basic
  }

  onSubmit() {

    let contactParams = {
        work: this.contactForm.value.work,
        name: this.contactForm.value.name,
        email: this.contactForm.value.email,
        phone: this.contactForm.value.phone,	
      }
      
      this.contactService.postContact(contactParams)
      .subscribe((res) => {
          console.log('contact is opgeslagen', res)
          this.contactForm.reset();
        },
        )
  }

}
