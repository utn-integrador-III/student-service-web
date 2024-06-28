import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LostItemsComponent } from './lost-items.component';

describe('LostItemsComponent', () => {
  let component: LostItemsComponent;
  let fixture: ComponentFixture<LostItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LostItemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LostItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
