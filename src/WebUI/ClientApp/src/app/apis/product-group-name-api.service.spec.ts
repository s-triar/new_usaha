import { TestBed } from '@angular/core/testing';

import { ProductGroupNameApiService } from './product-group-name-api.service';

describe('ProductGroupNameApiService', () => {
  let service: ProductGroupNameApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductGroupNameApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
