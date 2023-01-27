import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBussinessAddressFormComponent } from './add-bussiness-address-form.component';

describe('AddBussinessAddressFormComponent', () => {
  let component: AddBussinessAddressFormComponent;
  let fixture: ComponentFixture<AddBussinessAddressFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AddBussinessAddressFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBussinessAddressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
