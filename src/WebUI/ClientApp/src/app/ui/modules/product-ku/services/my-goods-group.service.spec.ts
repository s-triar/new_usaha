import { TestBed } from '@angular/core/testing';

import { MyGoodsGroupService } from './my-goods-group.service';

describe('GoodsGroupService', () => {
  let service: MyGoodsGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyGoodsGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
