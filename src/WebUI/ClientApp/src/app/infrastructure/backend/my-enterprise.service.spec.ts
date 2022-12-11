import { TestBed } from '@angular/core/testing';

import { MyEnterpriseService } from './my-enterprise.service';

describe('MyEnterpriseService', () => {
  let service: MyEnterpriseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyEnterpriseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
