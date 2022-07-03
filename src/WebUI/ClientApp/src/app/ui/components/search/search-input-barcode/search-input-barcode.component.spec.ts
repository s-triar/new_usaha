import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInputBarcodeComponent } from './search-input-barcode.component';

describe('SearchInputBarcodeComponent', () => {
  let component: SearchInputBarcodeComponent;
  let fixture: ComponentFixture<SearchInputBarcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchInputBarcodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInputBarcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
