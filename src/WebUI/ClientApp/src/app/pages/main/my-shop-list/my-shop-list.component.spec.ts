import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyShopListComponent } from './my-shop-list.component';

describe('MyShopListComponent', () => {
  let component: MyShopListComponent;
  let fixture: ComponentFixture<MyShopListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyShopListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyShopListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
