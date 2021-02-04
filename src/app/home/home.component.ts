import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '../models/contact';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { AllContactService } from '../services/all-contact.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  constructor(
    private route: Router,
    private http: HttpClient,
    private allcontacts: AllContactService
  ) {}
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
    this.allcontacts.getContacts().subscribe((res) => {
      this.contactsNotFav = [...res];
      this.backNotFav = [...res];
      this.allContacts = [...res];
    });
  }

  onFavorite(element: Contact) {
    element.favorite = !element.favorite;
    this.updateList();
  }

  updateList() {
    let filtred = this.allContacts.filter(
      (c) =>
        !this.model ||
        c.name.toLowerCase().indexOf(this.model.toLowerCase()) >= 0
    );
    this.contactsFav = filtred.filter((c) => c.favorite);
    this.contactsNotFav = filtred.filter((c) => !c.favorite);
  }

  onRedirection(contact: Contact) {
    this.route.navigateByUrl(`home/card-detail/${contact.shortName}`);
  }
  displayCard() {
    this.displayStyle = 'card';
  }
  displayList() {
    this.displayStyle = 'list';
  }

  onKey(event: any) {
    this.updateList();
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
}
