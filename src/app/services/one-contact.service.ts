import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contact } from '../models/contact';
import { AllContactService } from './all-contact.service';

@Injectable({
  providedIn: 'root',
})
export class OneContactService {
  constructor(private allContactService: AllContactService) {}
  getTheContact(id: any): Observable<Contact> {
    let filtered: any;
    return this.allContactService.getContacts().pipe(
      map((res) => {
        filtered = res.filter((c) => c.shortName == id)[0];
        return filtered;
      })
    );
  }
}
