import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosCashierSearchComponent } from './pos-cashier-search.component';

describe('PosCashierSearchComponent', () => {
  let component: PosCashierSearchComponent;
  let fixture: ComponentFixture<PosCashierSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PosCashierSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PosCashierSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
