import { TestBed } from '@angular/core/testing';

import { ApplicationBackgroundService } from './application-background.service';

describe('ApplicationBackgroundService', () => {
  let service: ApplicationBackgroundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationBackgroundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
