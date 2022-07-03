import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProductListItemComponent } from './my-product-list-item.component';

describe('MyProductListItemComponent', () => {
  let component: MyProductListItemComponent;
  let fixture: ComponentFixture<MyProductListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyProductListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProductListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
