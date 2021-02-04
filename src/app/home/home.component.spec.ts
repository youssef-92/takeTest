import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { mockFavList } from '../Constants/mock-favorite-list';
import { Contact } from '../models/contact';

import { HomeComponent } from './home.component';

function createMockList() {
  const mockContactsList: Contact[] = [
    {
      shortName: 'chief_hopper',
      name: 'Chief Hopper',
      description: 'Interpretado por: David Harbour.',
      image:
        'data:image/jpeg;base64,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',
      template: 'master',
      created: '2020-02-31T14:35:44.510Z',
      updated: '2020-02-31T14:35:44.510Z',
      plan: 'standard',
      culture: 'pt-BR',
      favorite: true,
      analytics: {
        user: {
          total: 12,
          actived: 2,
        },
        message: {
          received: 10000,
          sent: 10001,
        },
      },
    },
    {
      shortName: 'suzie',
      name: 'Suzie',
      description: 'Interpretado por: Gabriella Pizzolo.',
      image:
        'data:image/jpeg;base64,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',
      template: 'master',
      created: '2020-01-01T14:35:44.510Z',
      updated: '2020-02-21T14:35:44.510Z',
      plan: 'standard',
      culture: 'pt-BR',
      favorite: true,
      analytics: {
        user: {
          total: 230,
          actived: 10,
        },
        message: {
          received: 10000,
          sent: 10001,
        },
      },
    },
    {
      shortName: 'jonathan',
      name: 'Jonathan',
      description: 'Interpretado por: Charlie Heaton.',
      image:
        'data:image/jpeg;base64,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',
      template: 'master',
      created: '2020-03-31T14:35:44.510Z',
      updated: '2020-03-31T14:35:44.510Z',
      plan: 'standard',
      culture: 'pt-BR',
      favorite: false,
      analytics: {
        user: {
          total: 130,
          actived: 13,
        },
        message: {
          received: 10000,
          sent: 10001,
        },
      },
    },
  ];
  return mockContactsList;
}
function createMockFavList() {
  return mockFavList;
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [HomeComponent],
    }).compileComponents();
    httpMock = TestBed.get(HttpTestingController);
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should transfer from favorite to not favorite', () => {
    component.allContacts = createMockList();
    const cf = component.allContacts[0];
    component.onFavorite(cf);
    expect(component.contactsFav.length).toEqual(1);
    expect(component.contactsNotFav.length).toEqual(2);
  });

  it('should transfer from favorite to not favorite', () => {
    component.allContacts = createMockList();
    const cnf = component.allContacts[2];
    component.onFavorite(cnf);
    expect(component.contactsNotFav.length).toEqual(0);
    expect(component.contactsFav.length).toEqual(3);
  });

  it('should display card', () => {
    component.displayCard();
    expect(component.displayStyle).toEqual('card');
  });

  it('should display list', () => {
    component.displayList();
    expect(component.displayStyle).toEqual('list');
  });

  it('should verify if the word searched found or no', () => {
    component.model = 'Suzie';
    component.allContacts = createMockList();
    component.updateList();
    expect(component.contactsNotFav.length).toEqual(0);
    expect(component.contactsFav.length).toEqual(1);
  });

  it('should show the greater name', () => {
    let a = 'Jonathan';
    let b = 'Chief Hopper';
    component.compareStrings(a, b);
    expect(component.compareStrings(a, b)).toBe(1);
  });

  it('should show the greater date ', () => {
    let a = '2020-02-31T14:35:44.510Z';
    let b = '2020-01-01T14:35:44.510Z';
    component.compareStrings(a, b);
    expect(component.compareStrings(a, b)).toBe(1);
  });

  it('should return an array ordred by date', () => {
    component.contactsFav = createMockFavList();
    component.sortByDates();
    expect(component.contactsFav[0].name).toEqual('Suzie');
  });

  it('should return an array ordred by alphabet', () => {
    component.contactsFav = createMockFavList();
    component.sortByAlphabet();
    expect(component.contactsFav[1].name).toEqual('Suzie');
  });
  afterEach(() => {
    httpMock.verify();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
