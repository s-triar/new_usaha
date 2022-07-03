import { TestBed } from '@angular/core/testing';

import { GoodsGroupService } from './goods-group.service';

describe('GoodsGroupService', () => {
  let service: GoodsGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoodsGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
