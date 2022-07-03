import { TestBed } from '@angular/core/testing';

import { GoodsTypeService } from './goods-type.service';

describe('GoodsTypeService', () => {
  let service: GoodsTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoodsTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
