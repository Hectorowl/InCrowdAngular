import { TestBed } from '@angular/core/testing';

import { EventdataService } from './eventdata.service';

describe('EventdataService', () => {
  let service: EventdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('EventDataService should return value from observable',
    (done: DoneFn) => {
      service.getEsr().subscribe(value => {
        expect(value).toBe('');
        done();
      });
    });

  it('EventDataService should return value from observable after updated',
    (done: DoneFn) => {
      service.updateEsr('Evento API')
      service.getEsr().subscribe(value => {
        expect(value).toBe('Evento API');
        done();
      });
    });
});
