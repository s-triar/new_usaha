import { TestBed } from '@angular/core/testing';

import { PopUpLoadingService } from './pop-up-loading.service';

describe('PopUpLoadingService', () => {
  let service: PopUpLoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopUpLoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
