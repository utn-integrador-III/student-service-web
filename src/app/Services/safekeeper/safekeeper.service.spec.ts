import { TestBed } from '@angular/core/testing';

import { SafekeeperService } from './safekeeper.service';

describe('SafekeeperService', () => {
  let service: SafekeeperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SafekeeperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
