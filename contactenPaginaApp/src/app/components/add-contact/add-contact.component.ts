import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/service/contact.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {

  contactForm!: FormGroup;
  loading = false;
  basic = false;

  constructor(
    private contactService: ContactService, 
    private fb: FormBuilder,
    private toastr: ToastrService) { }

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
    this.loading = true;

    let contactParams = {
        work: this.contactForm.value.work,
        name: this.contactForm.value.name,
        email: this.contactForm.value.email,
        phone: this.contactForm.value.phone,	
      }
      
      this.contactService.postContact(contactParams)
      .subscribe((res) => {
        this.toastr.success('contact is opgeslagen', '',  {positionClass: 'toast-top-center'})
          this.loading = false;
          this.contactForm.reset();
        },
        (err) => {
          this.toastr.error(err, '', {positionClass: 'toast-top-center'})
          this.loading = false;
        }
        )
  }

}
