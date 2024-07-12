import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentLogComponent } from './student-log.component';

describe('StudentLogComponent', () => {
  let component: StudentLogComponent;
  let fixture: ComponentFixture<StudentLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentLogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
