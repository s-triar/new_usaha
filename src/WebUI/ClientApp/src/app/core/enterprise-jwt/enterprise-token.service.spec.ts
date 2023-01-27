import { TestBed } from '@angular/core/testing';

import { EnterpriseTokenService } from './enterprise-token.service';

describe('EnterpriseTokenService', () => {
  let service: EnterpriseTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnterpriseTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
