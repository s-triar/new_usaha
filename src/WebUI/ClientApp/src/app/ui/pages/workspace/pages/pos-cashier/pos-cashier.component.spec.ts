import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosCashierComponent } from './pos-cashier.component';

describe('PosCashierComponent', () => {
  let component: PosCashierComponent;
  let fixture: ComponentFixture<PosCashierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PosCashierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PosCashierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
