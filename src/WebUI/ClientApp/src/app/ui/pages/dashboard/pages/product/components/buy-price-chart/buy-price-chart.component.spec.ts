import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyPriceChartComponent } from './buy-price-chart.component';

describe('BuyPriceChartComponent', () => {
  let component: BuyPriceChartComponent;
  let fixture: ComponentFixture<BuyPriceChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ BuyPriceChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyPriceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
