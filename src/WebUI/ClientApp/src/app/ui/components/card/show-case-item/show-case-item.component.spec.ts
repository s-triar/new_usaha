import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCaseItemComponent } from './show-case-item.component';

describe('ShowCaseItemComponent', () => {
  let component: ShowCaseItemComponent;
  let fixture: ComponentFixture<ShowCaseItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowCaseItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCaseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
