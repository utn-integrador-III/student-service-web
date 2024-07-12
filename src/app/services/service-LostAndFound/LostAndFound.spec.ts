import { TestBed } from '@angular/core/testing';
import { LostAndFoundService } from './LostAndFound.service';

describe('ZoneService', () => {
  let service: LostAndFoundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LostAndFoundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
