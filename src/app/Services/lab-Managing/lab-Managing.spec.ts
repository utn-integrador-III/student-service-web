import { TestBed } from '@angular/core/testing';
import { LabManaging } from './labManaging.service';

describe('ZoneService', () => {
  let service: LabManaging;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LabManaging);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
