import { TestBed } from '@angular/core/testing';

import { InfoRoleResolver } from './info-role.resolver';

describe('InfoRoleResolver', () => {
  let resolver: InfoRoleResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(InfoRoleResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
