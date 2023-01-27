import { TestBed } from '@angular/core/testing';

import { MyGoodsService } from './my-goods.service';

describe('GoodsService', () => {
  let service: MyGoodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyGoodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
