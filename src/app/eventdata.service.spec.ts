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
});
