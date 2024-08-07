import { TestBed } from '@angular/core/testing';
import { ProfessorManaging } from './professor.service';

describe('ZoneService', () => {
  let service: ProfessorManaging;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfessorManaging);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
