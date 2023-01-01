import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NSoldChartComponent } from './n-sold-chart.component';

describe('NSoldChartComponent', () => {
  let component: NSoldChartComponent;
  let fixture: ComponentFixture<NSoldChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ NSoldChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NSoldChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
