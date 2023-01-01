import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellPriceChartComponent } from './sell-price-chart.component';

describe('SellPriceChartComponent', () => {
  let component: SellPriceChartComponent;
  let fixture: ComponentFixture<SellPriceChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SellPriceChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellPriceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
