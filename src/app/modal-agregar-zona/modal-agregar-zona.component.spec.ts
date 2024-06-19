import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarZonaComponent } from './modal-agregar-zona.component';

describe('ModalAgregarZonaComponent', () => {
  let component: ModalAgregarZonaComponent;
  let fixture: ComponentFixture<ModalAgregarZonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAgregarZonaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalAgregarZonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
