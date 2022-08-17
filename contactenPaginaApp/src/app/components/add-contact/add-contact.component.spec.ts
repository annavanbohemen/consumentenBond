import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ContactService } from 'src/app/service/contact.service';

import { AddContactComponent } from './add-contact.component';

describe('AddContactComponent', () => {
  let component: AddContactComponent;
  let fixture: ComponentFixture<AddContactComponent>;
  let _contactService: ContactService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddContactComponent ],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContactComponent);
    component = fixture.componentInstance;
    _contactService = TestBed.inject(ContactService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('will call postContact service when submitting the form', () => {
    //set form control fields
    component.contactForm.controls['name'].setValue('testNaam');
    component.contactForm.controls['work'].setValue('Werk');

    const contactParams = {
      name: component.contactForm.value.name,
      work: component.contactForm.value.work,
    }

    const mockedResponse = {name: 'testNaam', work: 'Werk'};
    const contactServiceSpy = spyOn (
      _contactService, 'postContact').and.returnValue(of(mockedResponse));
      component.onSubmit();
      expect(contactServiceSpy).toHaveBeenCalledWith(contactParams);
    });

    it('will reset the form after having submitted it successfully', () => {
      // Set form control fields
      component.contactForm.controls['name'].setValue('testNaam');
      component.contactForm.controls['work'].setValue('Werk');

      const mockedResponse = {name: 'testNaam', work: 'Werk'};
      spyOn(_contactService, 'postContact').and.returnValue(of(mockedResponse));
  
      const resetFormSpy = spyOn(component.contactForm, 'reset');
  
      component.onSubmit();
  
      expect(resetFormSpy).toHaveBeenCalled();
    });

    it('will set loading to false after getting the successfully response for the form submission', () => {
      // Set form control fields
      component.contactForm.controls['name'].setValue('testNaam');
      component.contactForm.controls['work'].setValue('Werk');

      const mockedResponse = {name: 'testNaam', work: 'Werk'};
      spyOn(_contactService, 'postContact').and.returnValue(of(mockedResponse));
      const setLoadingSpy = spyOn(component, 'setLoading');
      component.onSubmit();
  
      expect(setLoadingSpy).toHaveBeenCalledWith(false);
    });
});
