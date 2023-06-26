import { TestBed } from '@angular/core/testing';

import { UserdataService } from './userdata.service';

describe('UserdataService', () => {
  let service: UserdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('UserDataService should return value from observable',
    (done: DoneFn) => {
      service.getLan().subscribe(value => {
        expect(value).toBe('');
        done();
      });
    });

  it('UserDataService should return value from observable after updated',
    (done: DoneFn) => {
      service.updateLan('hectoruser')
      service.getLan().subscribe(value => {
        expect(value).toBe('hectoruser');
        done();
      });
    });
});
