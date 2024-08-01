import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickClassesComponent } from './pick-classes.component';

describe('PickClassesComponent', () => {
  let component: PickClassesComponent;
  let fixture: ComponentFixture<PickClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickClassesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PickClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
