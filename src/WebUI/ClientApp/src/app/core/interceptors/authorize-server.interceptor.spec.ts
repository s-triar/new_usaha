import { TestBed } from '@angular/core/testing';

import { AuthorizeServerInterceptor } from './authorize-server.interceptor';

describe('AuthorizeServerInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthorizeServerInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthorizeServerInterceptor = TestBed.inject(AuthorizeServerInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
