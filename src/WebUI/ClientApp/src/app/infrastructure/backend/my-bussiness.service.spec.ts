import { TestBed } from '@angular/core/testing';

import { MyBussinessService } from './my-bussiness.service';

describe('MyBussinessService', () => {
  let service: MyBussinessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyBussinessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
