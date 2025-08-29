import { TestBed } from '@angular/core/testing';
import { BookingComputer } from './bookingComputer.service';

describe('BookingComputer', () => {
  let service: BookingComputer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingComputer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
