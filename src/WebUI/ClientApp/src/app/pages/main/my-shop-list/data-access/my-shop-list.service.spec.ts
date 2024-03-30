import { TestBed } from '@angular/core/testing';

import { MyShopListService } from './my-shop-list.service';

describe('MyShopListService', () => {
  let service: MyShopListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyShopListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
