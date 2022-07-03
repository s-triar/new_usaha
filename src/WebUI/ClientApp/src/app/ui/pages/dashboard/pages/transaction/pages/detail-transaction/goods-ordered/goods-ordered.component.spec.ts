import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsOrderedComponent } from './goods-ordered.component';

describe('GoodsOrderedComponent', () => {
  let component: GoodsOrderedComponent;
  let fixture: ComponentFixture<GoodsOrderedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodsOrderedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsOrderedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
