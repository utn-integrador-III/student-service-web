import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BitacoryComponent } from './bitacory.component';

describe('BitacoryComponent', () => {
  let component: BitacoryComponent;
  let fixture: ComponentFixture<BitacoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BitacoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BitacoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
