import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IContact, IContactsList } from '../models/contact';
import { createHttpParams } from './http-params';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private ContactUrl = 'contacten/save';
  private ContactListUrl = 'contacten/list';

  constructor(private http: HttpClient) { }

  postContact(contactInfo: any ): Observable<IContact> {

    let params: HttpParams = createHttpParams({
      contact: contactInfo.work,
      name: contactInfo.name,
      email: contactInfo.email,
      phone: contactInfo.phone,
    })

    return this.http.post<IContact>(
      `${this.ContactUrl}/${contactInfo.version}`,
      contactInfo, {
        responseType: 'json'
      })
  }

  getContacts(): Observable<IContactsList> {
    return this.http.get<IContactsList>(
      this.ContactListUrl, {
        responseType: 'json'
      })
  }
}