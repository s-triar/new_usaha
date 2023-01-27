import { TestBed } from '@angular/core/testing';

import { PosCashierDataService } from './pos-cashier-data.service';

describe('PosCashierDataService', () => {
  let service: PosCashierDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PosCashierDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
