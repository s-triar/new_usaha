import { TestBed } from '@angular/core/testing';

import { ProductTypeApiService } from './product-type-api.service';

describe('ProductTypeApiService', () => {
  let service: ProductTypeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductTypeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
