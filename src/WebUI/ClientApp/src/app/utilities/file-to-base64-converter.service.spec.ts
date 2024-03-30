import { TestBed } from '@angular/core/testing';

import { FileToBase64ConverterService } from './file-to-base64-converter.service';

describe('FileToBase64ConverterService', () => {
  let service: FileToBase64ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileToBase64ConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
