import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBussinessPhotoFormComponent } from './add-bussiness-photo-form.component';

describe('AddBussinessPhotoFormComponent', () => {
  let component: AddBussinessPhotoFormComponent;
  let fixture: ComponentFixture<AddBussinessPhotoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AddBussinessPhotoFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBussinessPhotoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
