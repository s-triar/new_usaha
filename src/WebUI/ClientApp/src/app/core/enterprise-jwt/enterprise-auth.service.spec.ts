import { TestBed } from '@angular/core/testing';

import { EnterpriseAuthService } from './enterprise-auth.service';

describe('EnterpriseAuthService', () => {
  let service: EnterpriseAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnterpriseAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
