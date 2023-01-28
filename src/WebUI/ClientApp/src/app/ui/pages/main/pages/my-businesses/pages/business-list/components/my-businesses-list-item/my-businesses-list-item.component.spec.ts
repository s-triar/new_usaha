import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBusinessesListItemComponent } from './my-businesses-list-item.component';

describe('MyBusinessesListItemComponent', () => {
  let component: MyBusinessesListItemComponent;
  let fixture: ComponentFixture<MyBusinessesListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyBusinessesListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBusinessesListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
