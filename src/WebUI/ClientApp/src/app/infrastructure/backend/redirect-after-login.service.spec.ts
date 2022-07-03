import { TestBed } from '@angular/core/testing';

import { RedirectAfterLoginService } from './redirect-after-login.service';

describe('RedirectAfterLoginService', () => {
  let service: RedirectAfterLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RedirectAfterLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
