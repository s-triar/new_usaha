import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBussinessFormComponent } from './add-bussiness-form.component';

describe('AddBussinessFormComponent', () => {
  let component: AddBussinessFormComponent;
  let fixture: ComponentFixture<AddBussinessFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AddBussinessFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBussinessFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
