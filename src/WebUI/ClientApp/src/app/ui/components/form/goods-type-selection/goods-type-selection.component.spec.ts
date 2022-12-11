import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsTypeSelectionComponent } from './goods-type-selection.component';

describe('GoodsTypeSelectionComponent', () => {
  let component: GoodsTypeSelectionComponent;
  let fixture: ComponentFixture<GoodsTypeSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ GoodsTypeSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoodsTypeSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
