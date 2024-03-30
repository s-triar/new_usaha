import { TestBed } from '@angular/core/testing';

import { NavigationBackService } from './navigation-back.service';

describe('NavigationBackService', () => {
  let service: NavigationBackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigationBackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
