import { TestBed } from '@angular/core/testing';

import { DetailTransactionResolver } from './detail-transaction.resolver';

describe('DetailTransactionResolver', () => {
  let resolver: DetailTransactionResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DetailTransactionResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
