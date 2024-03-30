import { TestBed } from '@angular/core/testing';

import { FormValueToFormDataConverterService } from './form-value-to-form-data-converter.service';

describe('FormValueToFormDataConverterService', () => {
  let service: FormValueToFormDataConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormValueToFormDataConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
