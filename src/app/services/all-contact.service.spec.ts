import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { mockContactsList } from '../Constants/mock-list';
import { AllContactService } from './all-contact.service';

function createMockList() {
  return mockContactsList;
}
describe('AllContactService', () => {
  let service: AllContactService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AllContactService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('is testing the http request and it should return an array of contacts', () => {
    let mockList = createMockList();

    service.getContacts().subscribe((res) => {
      expect(res.length).toBe(3);
    });
    const request = httpMock.expectOne(`/assets/data.json`);
    request.flush(mockList);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
