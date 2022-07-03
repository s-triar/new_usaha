import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCaseShopItemComponent } from './show-case-shop-item.component';

describe('ShowCaseShopItemComponent', () => {
  let component: ShowCaseShopItemComponent;
  let fixture: ComponentFixture<ShowCaseShopItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowCaseShopItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCaseShopItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
