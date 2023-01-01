import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OmzetChartComponent } from './omzet-chart.component';

describe('OmzetChartComponent', () => {
  let component: OmzetChartComponent;
  let fixture: ComponentFixture<OmzetChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ OmzetChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OmzetChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
