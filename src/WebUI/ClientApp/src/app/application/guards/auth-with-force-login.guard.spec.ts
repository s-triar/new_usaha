import { TestBed } from '@angular/core/testing';

import { AuthWithForceLoginGuard } from './auth-with-force-login.guard';

describe('AuthWithForceLoginGuard', () => {
  let guard: AuthWithForceLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthWithForceLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
