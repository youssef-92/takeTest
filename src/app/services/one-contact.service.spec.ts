import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { mockContactsList } from '../Constants/mock-list';
import { OneContactService } from './one-contact.service';

function createMockList() {
  return mockContactsList;
}
describe('OneContactService', () => {
  let service: OneContactService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(OneContactService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('is testing the http request and it should return an array of contacts', () => {
    let mockList = createMockList();
    let id = 'chief_hopper';
    service.getTheContact(id).subscribe((res) => {
      expect(res.name).toBe('Chief Hopper');
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
