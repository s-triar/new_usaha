import { TestBed } from '@angular/core/testing';

import { PosCashierApiService } from './pos-cashier-api.service';

describe('PosCashierApiService', () => {
  let service: PosCashierApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PosCashierApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
