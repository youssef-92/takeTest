import { Component, OnInit } from '@angular/core';
import localeCode from 'locale-code';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.sass'],
})
export class CardDetailComponent implements OnInit {
  constructor() {}
  date: string = history.state.date;
  name: string = history.state.name;
  shortName: string = history.state.name;
  userActive: string = history.state.userActive;
  totalUser: string = history.state.totalUser;
  messagesSent: string = history.state.messagesSent;
  messagesReceived: string = history.state.messagesReceived;
  language: string = localeCode.getLanguageName(history.state.culture);
  languageCode: string = localeCode.getLanguageCode(history.state.culture);
  culture: string = history.state.culture;
  cityName: string = '';
  timeZone: string = '';

  ngOnInit(): void {
    const ct = require('countries-and-timezones');
    let countryCode = this.culture.slice(3);
    let countryInfo = [];
    countryInfo = ct.getTimezonesForCountry(countryCode);
    this.cityName = countryInfo[0].name;
    this.timeZone = countryInfo[0].utcOffsetStr;
  }
}
