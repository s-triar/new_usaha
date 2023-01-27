import { TestBed } from '@angular/core/testing';

import { EnterpriseInterceptor } from './enterprise.interceptor';

describe('EnterpriseInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      EnterpriseInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: EnterpriseInterceptor = TestBed.inject(EnterpriseInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
