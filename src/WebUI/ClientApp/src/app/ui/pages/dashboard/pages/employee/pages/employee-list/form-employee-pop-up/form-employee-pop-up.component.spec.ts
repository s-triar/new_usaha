import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEmployeePopUpComponent } from './form-employee-pop-up.component';

describe('FormEmployeePopUpComponent', () => {
  let component: FormEmployeePopUpComponent;
  let fixture: ComponentFixture<FormEmployeePopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEmployeePopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEmployeePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
