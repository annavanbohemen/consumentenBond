import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IContact, IContactsList, IresponseContactList } from '../models/contact';
import { createHttpParams } from './http-params';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private ContactSaveUrl = 'contacten/save';
  private ContactDeleteUrl = 'contacten/delete';
  private ContactListUrl = 'contacten/list';

  constructor(private http: HttpClient) { }

  postContact(contactInfo: any ): Observable<IContact> {

    let contactParams: HttpParams = createHttpParams({
      work: contactInfo.work,
      name: contactInfo.name,
      email: contactInfo.email,
      phone: contactInfo.phone,
    })

    return this.http.post<IContact>(
      this.ContactSaveUrl,
      contactParams, {
        responseType: 'json'
      })
  }

  getContacts(): Observable<IresponseContactList> {
    return this.http.get<IresponseContactList>(
      this.ContactListUrl, {
        responseType: 'json'
      })
  }

  removeContacts(id: number): Observable<any> {

    let deleteParams: HttpParams = createHttpParams({
      id: id
    })

    return this.http.delete<any>(
      this.ContactDeleteUrl + '/' + id, {
        responseType: 'json'
    })
  }
}
