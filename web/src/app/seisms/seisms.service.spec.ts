import { TestBed } from '@angular/core/testing';

import { SeismsService } from './seisms.service';

describe('SeismsService', () => {
  let service: SeismsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeismsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
