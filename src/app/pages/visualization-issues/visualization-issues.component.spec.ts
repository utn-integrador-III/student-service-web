import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationIssuesComponent } from './visualization-issues.component';

describe('VisualizationIssuesComponent', () => {
  let component: VisualizationIssuesComponent;
  let fixture: ComponentFixture<VisualizationIssuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizationIssuesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisualizationIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
