import { TestBed } from '@angular/core/testing';

import { ShopTypeApiService } from './shop-type-api.service';

describe('ShopTypeApiService', () => {
  let service: ShopTypeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopTypeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
