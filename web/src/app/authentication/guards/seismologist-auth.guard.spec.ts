import { TestBed } from '@angular/core/testing';

import { SeismologistAuthGuard } from './seismologist-auth.guard';

describe('SeismologistAuthGuard', () => {
  let guard: SeismologistAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SeismologistAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
