import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleObjectsComponent } from './module-objects.component';

describe('ModuleObjectsComponent', () => {
  let component: ModuleObjectsComponent;
  let fixture: ComponentFixture<ModuleObjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleObjectsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModuleObjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
