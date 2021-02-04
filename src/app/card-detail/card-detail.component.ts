import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import localeCode from 'locale-code';
import { EMPTYCONTACT } from '../Constants/contact';
import { Contact } from '../models/contact';
import { OneContactService } from '../services/one-contact.service';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.sass'],
})
export class CardDetailComponent implements OnInit {
  constructor(private route:ActivatedRoute, private oneContact:OneContactService) {

  }
  contact:Contact=EMPTYCONTACT
  language: string=''
  languageCode:string=''
  cityName: string = '';
  timeZone: string = '';

  ngOnInit(): void {
    let countryCode:string
    let countryInfo=[]
    const ct = require('countries-and-timezones');
    let id = this.route.snapshot.paramMap.get('id')
    this.oneContact.getTheContact(id).subscribe(res=>{
    this.contact=res
    countryCode=this.contact.culture.slice(3)
    countryInfo=ct.getTimezonesForCountry(countryCode)
    this.cityName = countryInfo[0].name;
    this.timeZone = countryInfo[0].utcOffsetStr;
    this.language= localeCode.getLanguageName(this.contact.culture);
    this.languageCode= localeCode.getLanguageCode(this.contact.culture);})

    }


}

