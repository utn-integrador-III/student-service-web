import { TestBed } from '@angular/core/testing';
import { ProfessorEmail } from './professorByEmail.service';

describe('ZoneService', () => {
  let service: ProfessorEmail;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfessorEmail);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
