import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainToolbarFooterComponent } from './main-toolbar-footer.component';

describe('MainToolbarFooterComponent', () => {
  let component: MainToolbarFooterComponent;
  let fixture: ComponentFixture<MainToolbarFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainToolbarFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainToolbarFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
