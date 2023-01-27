import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosCashierItemComponent } from './pos-cashier-item.component';

describe('PosCashierItemComponent', () => {
  let component: PosCashierItemComponent;
  let fixture: ComponentFixture<PosCashierItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PosCashierItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PosCashierItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
