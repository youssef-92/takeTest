import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '../interfaces/objects';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  constructor(private route: Router, private http: HttpClient) {}
  displayStyle: string = 'card';
  favorite: Boolean = false;
  allContacts: Contact[] = [];
  contactsNotFav: Contact[] = [];
  contactsFav: Contact[] = [];
  backFav: Contact[] = [];
  backNotFav: Contact[] = [];
  searchArray: string[] = [];
  searchWord: string = '';
  searchText = new Subject();
  results: Observable<string[]> | undefined;
  public model: any;

  ngOnInit() {
    this.getContacts().subscribe((res) => {
      this.contactsNotFav = [...res];
      this.backNotFav = [...res];
      this.allContacts = [...res];
    });
  }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>('/assets/data.json');
  }

  onFavorite(element: Contact) {
    let index = -1;
    if (element.favorite==true) {
      element.favorite = false;
      index = this.contactsFav.indexOf(element);
      this.contactsNotFav.push(element);
      this.backNotFav.push(element);
      if (index !== -1) {
        this.contactsFav.splice(index, 1);
      }
    } else {
      element.favorite = true;
      index = this.contactsNotFav.indexOf(element);
      this.contactsFav.push(element);
      this.backFav.push(element);
      if (index !== -1) {
        this.contactsNotFav.splice(index, 1);
        this.backNotFav.splice(index, 1);
      }
    }
  }
  onRedirection(contact: Contact) {
    this.route.navigateByUrl(`home/card-detail/${contact.shortName}`, {
      state: {
        shortName: contact.shortName,
        name: contact.name,
        messagesReceived: contact.analytics.message.received,
        date: contact.created,
        messagesSent: contact.analytics.message.sent,
        userActive: contact.analytics.user.actived,
        totalUser: contact.analytics.user.total,
        culture: contact.culture,
      },
    });
  }
  displayCard() {
    this.displayStyle = 'card';
  }
  displayList() {
    this.displayStyle = 'list';
  }

  onKey(event: any) {
    if (event.key == 'Enter') {
      let wordFav = this.filter(this.model, this.contactsFav);
      this.contactsFav.forEach((element: Contact) => {
        if (element.name == wordFav[0]) {
          this.contactsFav = [];
          this.contactsFav.push(element);
        }
      });

      let wordNotFav = this.filter(this.model, this.contactsNotFav);
      this.contactsNotFav.forEach((element: Contact) => {
        if (element.name == wordNotFav[0]) {
          this.contactsNotFav = [];
          this.contactsNotFav.push(element);
        }
      });
    } else if (event.key == 'Backspace') {
      this.contactsFav = this.backFav;
      this.contactsNotFav = this.backNotFav;
    }
  }

  sortByAlphabet() {
    this.contactsNotFav.sort((a, b) => this.compareStrings(a.name, b.name));
    this.contactsFav.sort((a, b) => this.compareStrings(a.name, b.name));
  }
  sortByDates() {
    this.contactsNotFav.sort((a, b) => this.compareDates(a.created, b.created));
    this.contactsFav.sort((a, b) => this.compareDates(a.created, b.created));
  }
  compareStrings(a: string, b: string) {
    a = a.toLowerCase();
    b = b.toLowerCase();

    return a < b ? -1 : a > b ? 1 : 0;
  }

  compareDates(a: string, b: string) {
    let c = Date.parse(a);
    let d = Date.parse(b);

    return c < d ? -1 : c > d ? 1 : 0;
  }

  filter(value: string, array: any): any[] {
    const filterValue = value.toLowerCase();
    return array
      .map((contact: any) => contact.name)
      .filter((item: string) => item.toLowerCase().includes(filterValue));
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      distinctUntilChanged(),
      map((term) =>
        term.length < 2
          ? []
          : this.allContacts
              .map((contact) => contact.name)
              .filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
      )
    );
}
